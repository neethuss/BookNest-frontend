import Book from "./Book";

export interface CardComponentProps{
  card: Book;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  onClick: () => void;
};