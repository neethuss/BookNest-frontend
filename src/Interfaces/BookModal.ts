import Book from "./Book";

export default interface BookModalProps {
  onClose: () => void
  onBookUpdate: (book: Book) => void;
  book?: Book | null
}