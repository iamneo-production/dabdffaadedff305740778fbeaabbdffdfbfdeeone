import React, { useState } from 'react';

const AddCollection = () => {
  const initialFormData = {
    id: '',
    name: '',
    author: '',
    publishYear: '',
    price: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('https://8080-dabdffaadedff305740778fbeaabbdffdfbfdeeone.premiumproject.examly.io/addsBook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Reset the form
          setFormData(initialFormData);
          setErrors({});
          // Open the success modal
          setIsSuccessModalOpen(true);
        } else {
          // Handle error response from the server, if needed
          console.error('Failed to submit data to the server');
        }
      } catch (error) {
        console.error('Error while making the POST request:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.id) {
      errors.id = 'ID is required';
    }

    if (!data.name) {
      errors.name = 'Name is required';
    }

    if (!data.author) {
      errors.author = 'Author is required';
    }

    if (!data.publishYear) {
      errors.publishYear = 'Publish Year is required';
    } else if (isNaN(data.publishYear) || +data.publishYear < 0) {
      errors.publishYear = 'Publish Year must be a positive number';
    }

    if (!data.price) {
      errors.price = 'Price is required';
    } else if (isNaN(data.price) || +data.price < 0) {
      errors.price = 'Price must be a positive number';
    }

    return errors;
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="add-collection">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id'>ID:</label>
          <input
            id='id'
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
          {errors.id && <div className="error">{errors.id}</div>}
        </div>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            id ='author'
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
          {errors.author && <div className="error">{errors.author}</div>}
        </div>
        <div>
          <label htmlFor='publishYear'>Publish Year:</label>
          <input
            id='publishYear'
            type="text"
            name="publishYear"
            value={formData.publishYear}
            onChange={handleInputChange}
          />
          {errors.publishYear && (
            <div className="error">{errors.publishYear}</div>
          )}
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input
            id='price'
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Success modal */}
      {isSuccessModalOpen && (
        <div className="success-modal">
          <p>Book data submitted successfully!</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddCollection;
