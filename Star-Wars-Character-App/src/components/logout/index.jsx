import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAuthItems } from '../../utils/authutils';
import Loader from '../loader';
import './Logout.css';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    removeAuthItems();

    // Simulate a delay to show the loader (e.g., 1 second)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); // Redirect to login page
    }, 1000); // Adjust the time as needed
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
};

export default Logout;
