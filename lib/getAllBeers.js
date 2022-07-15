// possible to get max 80 beers at once (per page) => function to get em all!

export async function getAllBeers(page = 1, beers = []) {
  return fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=${page}`)
    .then((response) => response.json())
    .then((newBeers) => {
      const allBeers = [...beers, ...newBeers];

      if (newBeers.length !== 0) {
        page++;
        return getAllBeers(page, allBeers);
      }
      return allBeers;
    });
}
