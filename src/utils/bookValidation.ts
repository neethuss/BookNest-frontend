import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  author: z.string().trim().nonempty("Author name is required"),
  publicationYear: z
  .number()
  .int({ message: "Publication year must be an integer" })
  .min(1000, { message: "Publication year must be a 4-digit number" })
  .max(new Date().getFullYear(), { message: "Enter valid publication year" }),
  isbn: z
  .string()
    .refine((val) => {
      const isbnPattern = /^(?:\d{9}[\dX]|\d{13})$/;
      return isbnPattern.test(val);
    }, { message: "Enter a valid isbn-10 or isbn-13" }),
  description: z.string().trim().nonempty("Description is required"),
});