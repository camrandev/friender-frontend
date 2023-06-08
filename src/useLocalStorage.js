import React from 'react';
import { useState, useEffect } from 'react';

function useLocalStorage () {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    token === "" ?
                  localStorage.removeItem('token')
                 :
                  localStorage.setItem('token', token);
  }, [token]);

  return [token, setToken];
};

export default useLocalStorage;