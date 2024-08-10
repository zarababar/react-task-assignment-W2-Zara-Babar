import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    localStorage.removeItem("authToken");

    // Simulate a delay to show the loader (e.g., 1 second)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); // Redirect to login page
    }, 1000); // Adjust the time as needed
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  // Optionally, you can return null or an empty fragment if the component is already redirected
  return null;
};

export default Logout;
