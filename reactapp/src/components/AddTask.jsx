import React, { useState } from 'react';

const AddTask = () => {
  const initialTask = {
    name: '',
    description: '',
    deadline: '',
    priority: '',
  };

  const [task, setTask] = useState(initialTask);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const errors = validateForm(task);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });

        if (response.ok) {
          // Reset the form
          setTask(initialTask);
          // Show the success message
          setValidationErrors({});
          setIsSuccessMessageVisible(true);
        
        } else {
          console.error('Failed to submit task data to the server');
        }
      } catch (error) {
        console.error('Error while making the POST request:', error);
      }
    } else {
      setValidationErrors(errors);
    }
  };


  const closeSuccessMessage = () => {
    setIsSuccessMessageVisible(false);
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = 'Task Name is required';
    }

    if (!data.description) {
      errors.description = 'Description is required';
    }

    if (!data.deadline) {
      errors.deadline = 'Deadline is required';
    }

    if (!data.priority) {
      errors.priority = 'Priority is required';
    } else if (!['high', 'medium', 'low'].includes(data.priority)) {
      errors.priority = 'Priority must be one of: high, medium, low';
    }

    return errors;
  };

  return (
    <div className="add-task">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="taskname" className="form-label">Task Name:</label>
          <input
            id='taskname'
            type="text"
            name="name"
            value={task.name}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.name && (
            <div className="error-message">{validationErrors.name}</div>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id='description'
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
          {validationErrors.description && (
            <div className="error-message">{validationErrors.description}</div>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="deadline"className="form-label">Deadline:</label>
          <input
            id='deadline'
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleInputChange}
            className="form-input"
          />
          {validationErrors.deadline && (
            <div className="error-message">{validationErrors.deadline}</div>
          )}
        </div>
        <div className="form-field">
          <label htmlFor='priority' className="form-label">Priority:</label>
          <select
            id='priority'
            name="priority"
            value={task.priority}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {validationErrors.priority && (
            <div className="error-message">{validationErrors.priority}</div>
          )}
        </div>
        <div className="form-field">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>

      {/* Success message */}
      {isSuccessMessageVisible && (
        <div className="success-message" data-testid="success-message-container">
          <p>Task data submitted successfully!</p>
          <button onClick={closeSuccessMessage} className="close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
