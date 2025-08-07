import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인된 사용자가 접근하면 안 되는 페이지
const authRoutes = ['/login'];

// 보호된 라우트 (로그인 필요)
const protectedRoutes = ['/mypage', '/settings', '/feed/add'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get('cookie');
  const hasTokens =
    cookieHeader?.includes('token') ||
    cookieHeader?.includes('accessToken') ||
    cookieHeader?.includes('refreshToken');

  // 카카오 OAuth 콜백 처리
  if (pathname.startsWith('/user/oauth2') && pathname.includes('callback')) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // 에러가 있는 경우
    if (error) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('error', 'oauth_failed');
      redirectUrl.searchParams.set(
        'message',
        '카카오 로그인 중 오류가 발생했습니다.',
      );
      return NextResponse.redirect(redirectUrl);
    }

    // 인증 코드가 없는 경우
    if (!code) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('error', 'no_code');
      redirectUrl.searchParams.set('message', '인증 코드가 없습니다.');
      return NextResponse.redirect(redirectUrl);
    }

    try {
      // 백엔드로 인증 코드 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KAKAO_LOGIN}/path*`,
        {
          method: 'GET',
          credentials: 'include',
          redirect: 'manual',
        },
      );

      // 백엔드에서 보낸 쿠키 처리
      const cookies = response.headers.getSetCookie();

      // 응답 상태 확인
      if (response.status === 200 || response.status === 302) {
        // 성공적인 로그인
        const redirectUrl = new URL('/', request.url);
        redirectUrl.searchParams.set('login', 'success');
        redirectUrl.searchParams.set('message', '로그인되었습니다.');

        const res = NextResponse.redirect(redirectUrl);

        // 쿠키를 프론트엔드 도메인으로 변환하여 설정
        cookies.forEach((cookie) => {
          const modifiedCookie = cookie
            .replace(/domain=[^;]+;?/g, 'domain=localhost;')
            .replace(/secure;?/g, '')
            .replace(/samesite=[^;]+;?/g, 'samesite=lax;');
          res.headers.append('Set-Cookie', modifiedCookie);
        });

        return res;
      } else {
        // 로그인 실패
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('error', 'login_failed');
        redirectUrl.searchParams.set('message', '로그인에 실패했습니다.');
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('OAuth 콜백 처리 에러:', error);
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('error', 'network_error');
      redirectUrl.searchParams.set('message', '네트워크 오류가 발생했습니다.');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 이미 로그인된 사용자의 로그인 페이지 접근 제한
  if (authRoutes.includes(pathname) && hasTokens) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('message', '이미 로그인되어 있습니다.');
    return NextResponse.redirect(redirectUrl);
  }

  // 보호된 라우트 접근 시 로그인 필요
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!hasTokens) {
      const url = new URL('/login', request.url);
      url.searchParams.set('error', 'auth_required');
      url.searchParams.set('message', '로그인이 필요한 서비스입니다.');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
