export default function SearchBar(props) {
  return (
    <section className="search-shell section-card">
      <div className="stack">
        <span className="eyebrow">Browse inventory</span>
        <strong>Search by name, brand, or category</strong>
      </div>

      <div className="search-controls">
        <input
          className="search-input"
          placeholder="Search products"
          value={props.searchTerm}
          onChange={function handleChange(event) {
            props.onSearchChange(event.target.value);
          }}
        />

        <select
          value={props.selectedCategory}
          onChange={function handleCategoryChange(event) {
            props.onCategoryChange(event.target.value);
          }}
        >
          {(props.categories || []).map(function mapCategory(category) {
            return (
              <option key={category} value={category}>
                {category === 'all' ? 'All categories' : category}
              </option>
            );
          })}
        </select>

        <select
          value={props.sortBy}
          onChange={function handleSortChange(event) {
            props.onSortChange(event.target.value);
          }}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="top-rated">Top rated</option>
        </select>

        <button className="outline-button" onClick={props.onClear}>
          Clear
        </button>
      </div>
    </section>
  );
}
