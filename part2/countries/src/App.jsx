import { useEffect, useState } from 'react';
import './App.css'
import services from './services/countries';
import SearchResults from './SearchResults';
import CountryDetail from './CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    services.getCountries().then(res => {
      setCountries(res);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      services.getCountry(selected).then(res => setCountryDetail(res));
    } else {
      setCountryDetail(null);
    }
  }, [selected]);

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value);
    let filter = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
    setFiltered(filter);
    if (filter.length === 1) {
      setSelected(filter[0].name.common);
    } else {
      setSelected(null);
    }
  }

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <label>Find countries</label>
        <input name="names" id="names" value={searchTerm} onChange={handleSearch} />
      </form>
      <SearchResults results={filtered} selected={selected} setSelected={setSelected} />
      {!!countryDetail && <CountryDetail detail={countryDetail} />}
    </>
  )
}

export default App
