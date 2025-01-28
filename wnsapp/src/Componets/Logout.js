import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('/api/logout')
      .then(() => {
        setAuth(false);
        navigate('/login');
      })
      .catch(error => console.error(error));
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
