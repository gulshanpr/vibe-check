'use client'
import React from 'react'

const page = () => {

  const handleCreateUser = async () => {
    try {
      const userDeatils = {
        veriferId: "gu32lsahn1",
        email: "gul32sah@dfaj.com",
        name: "hiiiwe"
      };


      const response = await fetch('/api/db', {
        method: 'POST',
        body: JSON.stringify(userDeatils),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newProduct = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok from client', newProduct.message);
      }

    } catch (error) {
      console.error('Failed to create product:', error);
    }
  }

  const handleGetUser = async () => {
    try {
      const response = await fetch('/api/db');
      if (!response.ok) {
        throw new Error('Network response was not ok from page');
      }

      const product = await response.json();

      console.log(product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser}>create user</button>
      <button onClick={handleGetUser}>get user</button>
    </div>
  )
}

export default page;
23