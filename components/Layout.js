import Image from 'next/image';
import Nav from './Nav';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.bgImage}>
        <Image
          src={children.type.name === 'Home' ? '/bg.jpg' : '/bg2.jpg'}
          alt="brew dog background"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89R8AApkBy17XrZoAAAAASUVORK5CYII="
        />
      </div>
      <Nav />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
