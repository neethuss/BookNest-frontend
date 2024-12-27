import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createBook = async (title?: string, author?: string, publicationYear?: string, isbn?: string, description?: string, image?: File | null) => {
  try {
    console.log(BACKEND_URL,'back')
    console.log('going to create',BACKEND_URL)
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('author', author || '');
    formData.append('publicationYear', publicationYear || '');
    formData.append('isbn', isbn || '');
    formData.append('description', description || '');
    if (image) {
      formData.append('file', image);
    }

    const response = await axios.post(`${BACKEND_URL}/book`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};


export const updateBook = async (id: string, title?: string, author?: string, publicationYear?: string, isbn?: string, description?: string, image?: File | null) => {
  try {
    console.log(BACKEND_URL,'back')
    console.log('going to create',BACKEND_URL)
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('author', author || '');
    formData.append('publicationYear', publicationYear || '');
    formData.append('isbn', isbn || '');
    formData.append('description', description || '');
    if (image) {
      formData.append('file', image);
    }

    const response = await axios.patch(`${BACKEND_URL}/book/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async(id:string)=>{
  try {
    const response = await axios.delete(`${BACKEND_URL}/book/${id}`)
    return response
  } catch (error) {
    console.log(error);

  }
}


export const getAllBooks = async (page:number, limit:number) => {
  try {
   const response = await axios.get(`${BACKEND_URL}/books`,{
    params: { page, limit }
   })

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const findBookById = async(id:string)=>{
  try {
    const response = await axios.get(`${BACKEND_URL}/book/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const searchBooks = async (searchTerm: string) => {
  console.log(searchTerm,'serch')
  const response = await axios.get(`${BACKEND_URL}/search?term=${searchTerm}`);
  return response
};
