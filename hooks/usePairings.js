import { useEffect, useState } from 'react';

export default function usePairings(query) {
  const [pairings, setPairings] = useState(['empty']);

  const fetchPairings = async (query) => {
    try {
      if (query) {
        const req = await fetch(
          `https://api.punkapi.com/v2/beers?food=${query}`
        );
        const data = await req.json();

        data.statusCode && data.statusCode !== 200 && console.log('😭');

        setPairings(data);
      } else {
        setPairings(['empty']);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPairings(query);
  }, [query]);

  return { pairings };
}
