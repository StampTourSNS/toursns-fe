'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft, User } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import styles from './Header.module.css';

//홈(서비스 이름, 로그인), SNS(뒤로가기, 축제이름), 축제 검색페이지(뒤로가기)
interface HeaderProps {
  pageType: 'home' | 'sns' | 'search';
  festivalName?: string;
  isLogin: boolean;
}
const Header = ({ pageType, festivalName, isLogin = false }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const handleLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleMyPage = () => {
    router.push(ROUTES.MYPAGE);
  };

  const renderHeader = () => {
    switch (pageType) {
      case 'home':
        return (
          <>
            <div className={styles.header_left}>
              <div className={styles.service_name}>TourSNS</div>
            </div>
            <div className={styles.header_right}>
              {!isLogin ? (
                <button className={styles.login_button} onClick={handleLogin}>
                  로그인
                </button>
              ) : (
                <div
                  className={styles.user_icon_container}
                  onClick={handleMyPage}
                >
                  <User size={24} className={styles.user_icon} />
                </div>
              )}
            </div>
          </>
        );

      case 'sns':
        return (
          <>
            <div className={styles.header_left}>
              <ChevronLeft
                size={32}
                onClick={handleBack}
                className={styles.back_button}
              />
            </div>
            <div className={styles.header_center}>
              <div className={styles.festival_name}>{festivalName}</div>
            </div>
            <div className={styles.header_right}></div>
          </>
        );

      case 'search':
        return (
          <>
            <div className={styles.header_left}>
              <ChevronLeft
                size={32}
                onClick={handleBack}
                className={styles.back_button}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div className={styles.header_container}>{renderHeader()}</div>;
};

export default Header;
