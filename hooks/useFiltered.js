import { useState, useEffect } from 'react';

export default function useFiltered(
  beers,
  nameQuery,
  abvQuery,
  ibuQuery,
  INITIAL_QUERY
) {
  const [filtered, setFiltered] = useState([]);

  const beerFilter = () => {
    let result = beers.filter((beer) =>
      beer.name.toLowerCase().includes(nameQuery.toLowerCase())
    );

    if (abvQuery !== INITIAL_QUERY) {
      result = result.filter((beer) => beer.abv === abvQuery);
    }

    if (ibuQuery !== INITIAL_QUERY) {
      result = result.filter((beer) => beer.ibu === ibuQuery);
    }

    return result;
  };

  useEffect(() => {
    setFiltered(beerFilter);
  }, [beers, nameQuery, abvQuery, ibuQuery, INITIAL_QUERY]);

  return { filtered };
}
