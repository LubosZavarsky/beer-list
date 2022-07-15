import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { getAllBeers } from '../../lib/getAllBeers';

import * as styles from '../../styles/SingleBeer.module.css';

const Beer = ({ beers }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{beers[0].name}</title>
        <meta name="description" content="Beerz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.beerSection}>
        {beers.map((beer) => {
          return (
            <div key={beer.id}>
              <h1 className={styles.title}>{beer.name}</h1>
              <p className={styles.desc}>{beer.description}</p>
              <div className={styles.abv}>
                <p>ABV: {beer.abv}%</p>
                <p>IBU: {beer.ibu ? beer.ibu : 'N/A'}</p>
              </div>

              <div style={{ maxWidth: '200px', margin: '2rem auto' }}>
                <Image
                  src={beer.image_url ? beer.image_url : '/beer.png'}
                  alt={beer.name ? beer.name : 'beer bottle'}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89R8AApkBy17XrZoAAAAASUVORK5CYII="
                />
              </div>

              <h2 className={styles.subtitle}>Food Pairing</h2>

              <ul>
                {beer.food_pairing.map((b, index) => (
                  <li key={index}>{b}</li>
                ))}
              </ul>

              <button className={styles.backBtn} onClick={() => router.back()}>
                Go back
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Beer;

export async function getStaticPaths() {
  const data = await getAllBeers();

  const paths = data.map((beer) => {
    return { params: { id: beer.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`);
  const data = await req.json();

  return {
    props: { beers: data },
    revalidate: 300,
  };
}
