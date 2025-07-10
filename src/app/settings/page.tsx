'use client';

import { useState } from 'react';

import { User } from 'lucide-react';

import styles from './settings.module.css';

const Settings = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const validateNickname = (value: string) => {
    const specialCharRegex = /[^a-zA-Z0-9가-힣]/;
    if (value.length < 2 || value.length > 10) {
      setError('닉네임은 2~10글자여야 합니다.');
    } else if (specialCharRegex.test(value)) {
      setError('닉네임에는 특수문자를 사용할 수 없습니다.');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    validateNickname(e.target.value);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.user_info_container}>
          <User className={styles.user_icon} />
        </div>
        <div className={styles.title_container}>
          <h1 className={styles.title}>처음 오셨군요?</h1>
          <label className={styles.description}>
            닉네임 설정은 필수입니다.
          </label>
        </div>
        <label className={styles.nickname_container}>
          닉네임 <span className={styles.required}>*</span>
        </label>
        <form className={styles.form_container}>
          <input
            className={styles.nickname_input}
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleChange}
          />
          {error && <p className={styles.error_message}>{error}</p>}
          <label className={styles.nickname_description}>
            닉네임과 프로필은 마이페이지에서 수정 가능합니다.
          </label>
          <button className={styles.submit_button} type="submit">
            완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
