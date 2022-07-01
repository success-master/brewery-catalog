import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BreweryList() {

  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const url = `https://api.openbrewerydb.org/breweries?per_page=10`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setResult(result);
      })
      .catch((err) => console.log(err));;
  }, [reset]);

  function searchFun() {
    if (search.length) {
      const url = `https://api.openbrewerydb.org/breweries/search?query=${search}`;
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setResult(result);
        });
    }
  }

  function resetFun() {
    const tempReset = reset;
    setSearch('');
    setReset(!tempReset);
  }

  return (
    <main>
      <h1 className='listHeader'>Brewery Catalog</h1>
      <div className='searchBar'>
        <input type='text' name='search' placeholder='Find a brewery' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => searchFun()}>Search</button>
        <button onClick={() => resetFun()}>Reset</button>
      </div>
      <ul>
        {result.map((item) =>
          <li key={item.id}>
            <Link to={`/breweries/${item.id}`}>{item.name}</Link> - {item.city}, {item.state}
          </li>
        )}

      </ul>
    </main>
  );
}
