const Filter = ({ filterText, handleFilter }) => {
    return (
        <div>filter shown with <input value={filterText} onChange={handleFilter} /></div>
    )
}

export default Filter;