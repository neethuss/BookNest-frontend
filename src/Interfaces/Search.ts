import Book from "./Book";

export default interface SearchComponentProps{
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  className?: string;
  type?: string;
  inputClassName?: string;
  onSuggest?: (suggestions: Book[]) => void; 
}