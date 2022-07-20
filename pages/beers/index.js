import { useState, useEffect } from 'react';
import { getAllBeers } from '../../lib/getAllBeers';
import { motion } from 'framer-motion';
import { DebounceInput } from 'react-debounce-input';
import { spring } from '../../lib/anim';
import useFiltered from '../../hooks/useFiltered';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { MdArrowForwardIos } from 'react-icons/md';
import * as styles from '../../styles/BeerList.module.css';

const BEERS_SHOWN = 10;
const INITIAL_QUERY = 'Show all';

const BeerList = ({ beers }) => {
  // search + filter
  const [nameQuery, setNameQuery] = useState('');
  const [abvQuery, setAbvQuery] = useState(INITIAL_QUERY);
  const [ibuQuery, setIbuQuery] = useState(INITIAL_QUERY);

  const { filtered } = useFiltered(
    beers,
    nameQuery,
    abvQuery,
    ibuQuery,
    INITIAL_QUERY
  );

  //get and sort abv
  const getAbv = filtered.map((item) => item.abv);
  const sortedAbv = [...new Set(getAbv.sort((a, b) => a - b))];

  //get and sort ibu
  const getIbu = filtered.map((item) => item.ibu);
  const sortedIbu = [...new Set(getIbu.sort((a, b) => a - b))];

  // show more
  const [next, setNext] = useState(BEERS_SHOWN);

  const handleMoreBeers = () => {
    setNext(next + BEERS_SHOWN);
  };

  return (
    <>
      <Head>
        <title>Beer list</title>
        <meta name="description" content="Brewdog catalogue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h2>Search beers</h2>
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          onChange={(e) => setNameQuery(e.target.value)}
          placeholder="Search beers"
          value={nameQuery}
        />

        <h2>Filter by ABV %</h2>

        <select value={abvQuery} onChange={(e) => setAbvQuery(e.target.value)}>
          <option>{INITIAL_QUERY}</option>

          {sortedAbv.map((a, id) => (
            <option key={id}>{a}</option>
          ))}
        </select>

        <h2>Filter by IBU</h2>

        <select value={ibuQuery} onChange={(e) => setIbuQuery(e.target.value)}>
          <option>{INITIAL_QUERY}</option>

          {sortedIbu.map((i, id) => (
            <option key={id}>{i}</option>
          ))}
        </select>

        <motion.ol layout transition={spring} className={styles.beerList}>
          {!filtered.length && <h2>No matches found</h2>}

          {filtered.slice(0, next).map((beer) => {
            return (
              <li key={beer.id} className={styles.listItem}>
                <Link href={`/beers/${beer.id}`}>
                  <a>
                    <div className={styles.image}>
                      <Image
                        src={beer.img ? beer.img : '/beer.png'}
                        alt={beer.name ? beer.name : 'beer bottle'}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89R8AApkBy17XrZoAAAAASUVORK5CYII="
                      />
                    </div>

                    <span>{beer.name}</span>

                    <div className={styles.arrow}>
                      {' '}
                      <MdArrowForwardIos />
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </motion.ol>
        {next < filtered.length && (
          <button onClick={handleMoreBeers} className={styles.btn}>
            Load more
          </button>
        )}
      </section>
    </>
  );
};

export default BeerList;

export async function getStaticProps() {
  const req = await getAllBeers();

  const data = req.map((b) => {
    return {
      id: b.id,
      name: b.name,
      img: b.image_url,
      abv: b.abv.toString(),
      ibu: b.ibu === null ? 'N/A' : b.ibu.toString(),
    };
  });

  return {
    props: { beers: data },
    revalidate: 300,
  };
}
