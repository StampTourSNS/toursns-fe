'use client';

import Image from 'next/image';

import styles from './login.module.css';

const Login = () => {
  const handleKakaoLogin = () => {
    console.log('kakao login');
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>로그인 하기</h1>
          <p className={styles.description}>
            소셜로그인으로 회원가입을 할 수 있습니다.
          </p>
          <hr className={styles.divider} />
        </div>
        <div className={styles.kakao_image_container}>
          <Image
            src={'/images/kakao.png'}
            alt="kakao"
            fill
            className={styles.kakao_image}
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
