"use client";

import React, { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import BookModal from "@/components/BookModal";
import { GiBlackBook } from "react-icons/gi";
import SearchComponent from "@/components/Search";
import ButtonComponent from "@/components/Button";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import Book from "@/Interfaces/Book";
import { getAllBooks } from "@/api/BookApi";
import ImageComponent from "@/components/Image";
import LoadingPage from "@/components/Loading";

export default function Page() {
  const [cards, setCards] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoadig, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const handleAddModalOpen = () => {
    setShowModal(true);
  };

  const handleAddModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      const response = await getAllBooks(currentPage, itemsPerPage);
      setCards(response?.data.allBooks);
      setTotalPages(response?.data.totalPages);
      setIsLoading(false)
    };
    fetchBooks();
  }, [currentPage, itemsPerPage]);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSuggestions = (suggestions: Book[]) => {
    setSearchResults(suggestions.length > 0 ? suggestions : []); 
  };
  

  const handleBookUpdate = (newBook: Book) => {
    setCards((prevCards) => {
      const index = prevCards.findIndex((book) => book._id === newBook._id);

      let updatedCards;
      if (index !== -1) {
        updatedCards = [...prevCards];
        updatedCards[index] = newBook;
      } else {
        updatedCards = [newBook, ...prevCards];
      }

      return updatedCards.slice(0, 3); // Keep only the first 3 items
    });
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex justify-between mt-5 items-center">
        <div
          className="flex items-center gap-2 pl-16 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <GiBlackBook size={30} />
          <h1 className="text-2xl font-bold">BOOKNEST</h1>
        </div>
        <div className="relative">
          <SearchComponent
            placeholder="Search for your favorite book..."
            className="mb-4 bg-transparent"
            inputClassName="text-gray-800 pl-8 text-cyan-100 pr-6"
            onSearch={(term) => console.log("Search:", term)}
            onSuggest={handleSuggestions}
          />
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1">
              <ul className="bg-white text-[#030b22] border border-gray-600 rounded-lg ">
                {searchResults.map((book) => (
                  <li
                    key={book._id}
                    className="px-4 py-2 cursor-pointer hover:bg-transparent hover:border-gray-600 hover:text-[#b6e9ec]"
                    onClick={() => router.push(`/books/${book._id}`)}
                  >
                    <p className="text-lg font-bold">{book.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="pr-16">
          <ButtonComponent
            className="bg-transparent border border-gray-600 rounded-3xl px-4 flex items-center gap-2"
            onClick={handleAddModalOpen}
          >
            Add New Book{" "}
            <span>
              <MdOutlineLibraryAdd />
            </span>
          </ButtonComponent>
        </div>
      </div>
      {cards && cards.length > 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-100">
            Your Books
          </h1>
          <FocusCards cards={cards} />

          <div className="flex items-center justify-center gap-2 mt-8 mb-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-transparent-200 hover:border-gray-500 disabled:bg-transparent disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === number
                      ? "bg-transparent border border-gray-600 text-white"
                      : "bg-transparent hover:border-none"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-transparent hover:bg-transparent disabled:bg-transparent disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative">
            <ImageComponent
              src="/uploads/empty.gif"
              alt="empty"
              width={400}
              height={400}
              className="object-cover"
            />
            <h1 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#030b22] bg-transparent bg-opacity-50 px-4 py-1 rounded whitespace-nowrap">
              OOPS! YOUR BOOKSHELF IS EMPTY
            </h1>
          </div>
        </div>
      )}

      {showModal && (
        <BookModal
          onClose={handleAddModalClose}
          onBookUpdate={handleBookUpdate}
        />
      )}

      {isLoadig && (
        <LoadingPage/>
      )}
    </div>
  );
}
