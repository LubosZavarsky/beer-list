import Link from 'next/link';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/beers">
            <a>Beers</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
