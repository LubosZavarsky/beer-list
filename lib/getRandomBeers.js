export async function getRandomBeers() {
  const req1 = await fetch('https://api.punkapi.com/v2/beers/random');
  const req2 = await fetch('https://api.punkapi.com/v2/beers/random');
  const req3 = await fetch('https://api.punkapi.com/v2/beers/random');

  const res = await Promise.all([req1.json(), req2.json(), req3.json()]);
  const flat = [...res].flat();

  const data = flat.map((b) => {
    return {
      id: b.id,
      name: b.name,
      image: b.image_url,
      tag: b.tagline,
      abv: b.abv,
      ibu: b.ibu,
    };
  });
  return data;
}
