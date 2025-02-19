import { memo, useState, ChangeEvent } from 'react';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = memo(function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  console.log('Search component rendered'); // Untuk tujuan debugging

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
});

export default Search;