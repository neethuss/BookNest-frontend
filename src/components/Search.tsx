"use client";

import { useState } from "react";
import SearchComponentProps from "@/Interfaces/Search";
import { Search } from "lucide-react";
import InputComponent from "./Input";
import { searchBooks } from "@/api/BookApi";

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "Search...",
  onSearch,
  onSuggest,
  className = "",
  inputClassName = "",
  type = "text",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    if (term) {
      try {
        const response = await searchBooks(term);
        const suggestions = response.data.allBooks; 
        onSuggest?.(suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      onSuggest?.([]); 
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    onSuggest?.([]); 
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <InputComponent
          type={type}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`bg-transparent border border-gray-600 rounded-xl py-2 ${inputClassName}`}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="h-5 w-5" />
        </span>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchComponent;
