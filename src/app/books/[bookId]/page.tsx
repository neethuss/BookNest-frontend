"use client";

import React, { useEffect, useState } from "react";
import { GiBlackBook } from "react-icons/gi";
import { useParams, useRouter } from "next/navigation";
import Book from "@/Interfaces/Book";
import { deleteBook, findBookById } from "@/api/BookApi";
import ImageComponent from "@/components/Image";
import ButtonComponent from "@/components/Button";
import BookModal from "@/components/BookModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import LoadingPage from "@/components/Loading";

export default function Page() {
  const [book, setBook] = useState<Book>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const book = await findBookById(bookId as string);
      setBook(book?.data.book);
    };
    fetchBook();
  }, [bookId]);

  const handleAddModalOpen = () => {
    setShowModal(true);
  };

  const handleAddModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteModalOpen = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleBookUpdate = (book: Book) => {
    setBook(book);
  };

  const handleDeleteBook = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteBook(id);
      if (response) {
        router.push("/books");
      }
    } catch (error) {
      console.log(error, "error while deleting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex justify-between items-center p-4 shrink-0">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <GiBlackBook size={30} />
          <h1 className="text-2xl font-bold">BOOKNEST</h1>
        </div>

        <div>
          <ButtonComponent
            className="bg-transparent border border-gray-600 rounded-3xl px-4 flex items-center gap-2"
            onClick={() => router.back()}
          >
            Go back
          </ButtonComponent>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex justify-center items-center p-4">
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            {book?.image ? (
              <ImageComponent
                src={book.image}
                alt="Book cover"
                width={250}
                height={350}
                className="max-w-full h-auto object-cover rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-gray-600">No image available</p>
            )}
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {book?.title.toUpperCase()}
            </h1>
            <p className="text-gray-600 mb-2">Author: {book? book?.author.charAt(0).toUpperCase() + book.author.slice(1) : ''}</p>
            <p className="text-gray-600 mb-2">
              Publication Year: {book?.publicationYear}
            </p>
            <p className="text-gray-600 mb-4">ISBN: {book?.isbn}</p>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4 max-h-40 overflow-y-auto scrollbar-hide">
              {book?.description}
            </p>
          </div>
        </div>

        
      </div>

      <div className="flex flex-row items-center justify-center gap-4 mb-10">
          <div>
            <ButtonComponent
              className="px-5 py-2 bg-blue-800 text-white rounded-lg"
              onClick={handleAddModalOpen}
            >
              Edit
            </ButtonComponent>
          </div>

          <div>
            <ButtonComponent
              className="px-5 py-2 bg-red-800 text-white rounded-lg"
              onClick={handleDeleteModalOpen}
            >
              Delete
            </ButtonComponent>
          </div>
        </div>

      {showModal && (
        <BookModal
          onClose={handleAddModalClose}
          onBookUpdate={handleBookUpdate}
          book={book}
        />
      )}
      {showDeleteModal && (
        <ConfirmationModal
          onClose={handleDeleteModalClose}
          itemName="this book"
          isOpen={true}
          onConfirm={() => handleDeleteBook(bookId as string)}
        />
      )}
      {isLoading && <LoadingPage />}
    </div>
  );
}
