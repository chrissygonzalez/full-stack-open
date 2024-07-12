const SearchResults = ({ results, selected, setSelected }) => {
    if (results.length === 0 || selected) return null;
    if (results.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    } else {
        return (
            <>
                {results.map(country =>
                    <p onClick={() => setSelected(country.name.common)} key={country.cca3}>{country.name.common}<button>Show</button></p>
                )}
            </>
        )
    }
}

export default SearchResults;