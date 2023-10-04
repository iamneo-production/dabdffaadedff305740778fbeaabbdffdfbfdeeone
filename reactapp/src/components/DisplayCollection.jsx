import React, { useEffect, useState } from 'react';

const DisplayCollection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('https://8080-dabdffaadedff305740778fbeaabbdffdfbfdeeone.premiumproject.examly.io/getAllBook', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }); // Replace with your backend API endpoint
        if (response.ok) {
          const data = await response.json();
          setBooks(data); // Set the retrieved data in the state
        } else {
          console.error('Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="display-collection">
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div>
              <strong>{book.name}</strong>
            </div>
            <div>Author: {book.author}</div>
            <div>Publish Year: {book.publishYear}</div>
            <div>Price: ${book.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayCollection;
