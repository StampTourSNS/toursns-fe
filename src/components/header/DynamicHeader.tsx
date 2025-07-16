'use client';

import { usePathname } from 'next/navigation';

import Header from './Header';

interface DynamicHeaderProps {
  isLogin: boolean;
}

export default function DynamicHeader({ isLogin }: DynamicHeaderProps) {
  const pathname = usePathname();

  // URL에 따라 pageType 결정
  const getPageType = (): 'home' | 'sns' | 'search' => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/sns')) return 'sns';
    return 'search';
  };

  const pageType = getPageType();

  // SNS 페이지인 경우 축제 이름 추출 (예: /sns/festival-name)
  const festivalName = pathname.startsWith('/sns/')
    ? pathname.split('/')[2]
    : undefined;

  return (
    <Header pageType={pageType} isLogin={isLogin} festivalName={festivalName} />
  );
}
