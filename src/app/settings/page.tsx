import { User } from 'lucide-react';

import styles from './settings.module.css';

const Settings = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.user_info_container}>
          <User className={styles.user_icon} />
        </div>
        <div className={styles.title_container}>
          <h1 className={styles.title}>처음 오셨군요?</h1>
          <p className={styles.description}>닉네임 설정은 필수입니다.</p>
        </div>
        <p className={styles.nickname_container}>
          닉네임 <span className={styles.required}>*</span>
        </p>
        <form className={styles.form_container}>
          <input
            className={styles.nickname_input}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <p className={styles.nickname_description}>
            닉네임과 프로필은 마이페이지에서 수정 가능합니다.
          </p>
          <button className={styles.submit_button} type="submit">
            완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
