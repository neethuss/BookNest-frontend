"use client";

import ImageComponent from "@/components/Image";
import SearchComponent from "@/components/Search";
import Book from "@/Interfaces/Book";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiBlackBook } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";

export default function Home() {

  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const router = useRouter()

 
  const handleSuggestions = (suggestions: Book[]) => {
    setSearchResults(suggestions.length > 0 ? suggestions : []); 
  };

  return (
    <div className="container mx-auto px-4 text-[#b6e9ec]">
      <div className="flex items-center gap-2 py-4">
        <GiBlackBook size={30} />
        <h1 className="text-2xl font-bold">BOOKNEST</h1>
      </div>
      <div className="flex flex-row items-center justify-between mt-[100px]">
        <div className="w-1/2 p-4 text-center mt-[90px]">
          <h1 className="font-bold text-3xl mb-3">
            YOUR PERSONAL BOOK COMPANION
          </h1>

          <SearchComponent
            placeholder="Search for your favorite book..."
            onSearch={(term) => console.log("Search:", term)}
            className="mb-4 bg-transparent"
            inputClassName="text-gray-800 pr-80 pl-8 text-cyan-100"
            onSuggest={handleSuggestions}

          />
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-[43%] mr-2">
              <ul className="bg-white text-[#030b22] border border-gray-600 rounded-lg ">
                {searchResults.map((book) => (
                  <li
                    key={book._id}
                    className="px-4 py-1 cursor-pointer hover:bg-transparent hover:border-gray-600 hover:text-[#b6e9ec] border-b border-[#030b22]  last:border-b-0"
                    onClick={() => router.push(`/books/${book._id}`)}
                  >
                    <p className="text-lg font-bold">{book.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href="/books"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            Explore All Books
            <IoArrowForward />
          </Link>
        </div>
        <div className="w-1/2 flex justify-center items-center p-4">
          <div className="relative">
            <ImageComponent
              src="/uploads/books.png"
              alt="book"
              width={300}
              height={225}
              containerClassName="w-[100%]"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
