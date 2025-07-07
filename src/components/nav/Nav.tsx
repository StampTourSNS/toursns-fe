import Link from 'next/link';

import { MessageSquareText, PartyPopper, Stamp } from 'lucide-react';

import { ROUTES } from '@/constants';

import styles from './Nav.module.css';

interface NavProps {
  isActive: boolean;
}

export default function Nav({ isActive }: NavProps) {
  if (!isActive) {
    return (
      <nav className={styles.nav_inactive}>
        <div className={styles.nav_inactive_text}>
          지금은 축제 기간이 아닙니다.
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_container}>
        <NavItem
          href={ROUTES.FEED}
          icon={<MessageSquareText size={28} />}
          label="피드"
        />
        <div className={styles.nav_live}>
          <Link href={ROUTES.LIVE}>
            <PartyPopper size={42} color="white" />
          </Link>
        </div>
        <NavItem
          href={ROUTES.STAMP}
          icon={<Stamp size={28} />}
          label="스탬프"
        />
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <div className={styles.nav_item_container}>
      <Link href={href} className={styles.nav_item}>
        {icon}
        <p className={styles.nav_item_text}>{label}</p>
      </Link>
    </div>
  );
}
