// SearchBar.js
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = () => {
  //   onSearch(searchTerm);
  // };

  return (
    <div className="my-4">
      <input
        type="text"
        className="w-full px-4 py-2 bg-gray-100 rounded"
        placeholder="Search by title or author name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        // onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
