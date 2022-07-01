import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BreweryDetail() {
  const { id } = useParams();
  const [resultItem, setResultItem] = useState([]);

  useEffect(() => {
    const url = `https://api.openbrewerydb.org/breweries/${id}`;

    async function fetchData() {
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setResultItem(res);
        })
        .catch((err) => console.log(err));
    }

    fetchData();
  }, []);

  return (
    <main className='detailBody'>
      <h1>{resultItem?.name}</h1>
      <p><strong>City: </strong>{resultItem?.city}</p>
      <p><strong>State: </strong>{resultItem?.state}</p>
      <p><strong>Country: </strong>{resultItem?.country}</p>
      <p><strong>Phone number: </strong>{resultItem?.phone}</p>
      {resultItem?.website_url !== null && <p>
        <strong>Website URL: </strong><a href={`${resultItem?.website_url}`}>View Website</a>
      </p>}
      <br />
      <Link to='/breweries'>Back to Breweries</Link>
    </main>
  );
}
