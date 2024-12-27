import BookModalProps from "@/Interfaces/BookModal";
import React, { useState, ChangeEvent, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LabelComponent from "./Label";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import ImageComponent from "./Image";
import BookErrors from "@/Interfaces/BookErrors";
import { bookSchema } from "@/utils/bookValidation";
import { createBook, updateBook } from "@/api/BookApi";
import LoadingPage from "./Loading";

const BookModal: React.FC<BookModalProps> = ({ onClose, book, onBookUpdate }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<BookErrors>({});

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublicationYear(book.publicationYear.toString());
      setIsbn(book.isbn);
      setDescription(book.description);
      setImagePreview(book.image);
      setOldImage(book.image)
    }else{
      setTitle('');
      setAuthor('');
      setPublicationYear('');
      setIsbn('');
      setDescription('')
      setImagePreview(null);
      setOldImage(null)
    }
  }, [book]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handlePublicationYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPublicationYear(value);
  };

  const handleSubmit = async () => {
    try {
      if (!title || !author || !publicationYear || !isbn || !description || !imagePreview) {
        setErrors({ general: "All fields must be filled out" });
        return;
      }
  
      const formData = {
        title,
        author,
        publicationYear: parseInt(publicationYear),
        isbn,
        description,
        image,
      };
  
      const validationResult = bookSchema.safeParse(formData);
  
      if (!validationResult.success) {
        const newErrors: BookErrors = {};
        validationResult.error.errors.forEach((err) => {
          const path = err.path[0].toString();
          newErrors[path as keyof BookErrors] = err.message;
        });
        setErrors(newErrors);
        return;
      }
  
      setErrors({});
  
      setIsLoading(true);
  
      let response;
      if (book) {
        const imageToUpload = image || oldImage ? image : null;
        response = await updateBook(book._id, title, author, publicationYear, isbn, description, imageToUpload);
        if (response) {
          console.log(response);
          onBookUpdate(response.data.updatedBook);
        }
      } else {
        response = await createBook(title, author, publicationYear, isbn, description, image);
        if (response) {
          console.log(response);
          onBookUpdate(response.data.newBook)
        }
      }
  
      onClose(); 
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false); 
    }
  };
  
  return (
    <div className="h-screen overflow-hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 w-[90%] max-w-2xl p-6 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-end">
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
            size={20}
          />
        </div>
        <div className="flex justify-center items-center mb-10">
          <h1>Add A New Book To Your Collection</h1>
        </div>

        <div className="flex justify-center items-center">
          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <LabelComponent htmlFor="title" className="block mb-1">
              Title
            </LabelComponent>
            <InputComponent
              id="title"
              name="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-xl bg-transparent ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
          <div className="flex-1">
            <LabelComponent htmlFor="author" className="block mb-1">
              Author
            </LabelComponent>
            <InputComponent
              id="author"
              name="author"
              value={author}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-xl bg-transparent ${
                errors.author ? "border-red-500" : ""
              }`}
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">{errors.author}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <LabelComponent htmlFor="publicationYear" className="block mb-1">
              Publication Year
            </LabelComponent>
            <InputComponent
              id="publicationYear"
              name="publicationYear"
              type="number"
              value={publicationYear}
              onChange={handlePublicationYearChange}
              className={`w-full px-3 py-2 border rounded-xl bg-transparent ${
                errors.publicationYear ? "border-red-500" : ""
              }`}
            />
            {errors.publicationYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.publicationYear}
              </p>
            )}
          </div>
          <div className="flex-1">
            <LabelComponent htmlFor="isbn" className="block mb-1">
              ISBN
            </LabelComponent>
            <InputComponent
              id="isbn"
              name="isbn"
              value={isbn}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsbn(e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-xl bg-transparent ${
                errors.isbn ? "border-red-500" : ""
              }`}
            />
            {errors.isbn && (
              <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <LabelComponent htmlFor="description" className="block mb-1">
            Description
          </LabelComponent>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-xl bg-transparent resize-none h-24 ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <LabelComponent
                htmlFor="image"
                className="cursor-pointer inline-block px-4 py-2 bg-transparent border text-white rounded-lg "
              >
                {imagePreview ? "Change Image" : "Add Image"}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </LabelComponent>
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>
            {imagePreview && (
              <ImageComponent
                src={imagePreview}
                alt="Profile"
                width={20}
                height={20}
                className="w-24 h-24 object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <ButtonComponent
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {book ? "Update Book" : "Add Book"}
          </ButtonComponent>
        </div>
      </div>
      {isLoading && (
        <LoadingPage/>
      )}
    </div>
  );
};

export default BookModal;
