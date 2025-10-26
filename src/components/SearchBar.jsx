// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-4 flex justify-end">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default SearchBar;
