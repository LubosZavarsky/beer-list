import Link from 'next/link';
import Image from 'next/image';
import * as styles from '../styles/Card.module.css';
import beerBottle from '../public/beer.png';

const Card = ({ beers }) => {
  return (
    <div className={styles.cardContainer}>
      {beers.map((beer, id) => (
        <div key={id} className={styles.card}>
          <Link href={`beers/${beer.id}`}>
            <a>
              <h2>{beer.name}</h2>
            </a>
          </Link>
          <div className={styles.image}>
            <Image
              src={beer.image ? beer.image : beerBottle}
              alt={beer.name ? beer.name : 'beer bottle'}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89R8AApkBy17XrZoAAAAASUVORK5CYII="
            />
          </div>

          <div className={styles.cardWrap}>
            <p>{beer.tag}</p>
            <div>
              <span>ABV: {beer.abv}%</span>
              <span>IBU: {beer.ibu ? beer.ibu : 'N/A'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
