import React, {useEffect, useState}  from 'react'
import axios from 'axios';
import BackButton from '../componentes/BackButton';
import Spinner from '../componentes/Spinner';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const [book, setBook] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong please check your console');
        setLoading(false);
      });
  }, [])
  
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounder-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure that you want to delete {book.title}?</h3>
        <button 
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook