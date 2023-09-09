import React, { useState, useEffect } from 'react';
import BackButton from '../componentes/BackButton';
import Spinner from '../componentes/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  // 3 differet states used to control the form data
  const [title, setTitle] = useState('');
  const [auther, setAuther] = useState('');
  const [publisher, setPublisher] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // used to navigate to main page
  const {id} = useParams();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`) //!!!be carefull writing the URL to avoid bugs
      .then((response) => {
        setAuther(response.data.auther);
        setPublisher(response.data.publisher);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      })
  }, []);

  // A handel for handling book Modification
  const handleEditBook = () => {
    const data = {
      title,
      auther,
      publisher,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Auther</label>
          <input
            type='text'
            value={auther}
            onChange={(e) => setAuther(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='text'
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>  
    </div>
  )
}

export default EditBook