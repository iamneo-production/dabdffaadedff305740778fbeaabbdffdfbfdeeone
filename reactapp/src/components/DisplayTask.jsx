import React, { useEffect, useState } from 'react';

const DisplayTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    async function fetchTasksFromBackend() {
      try {
        const response = await fetch('http://localhost:8080/getAllTask', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
         
        }); // Replace with your backend API endpoint
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Set the retrieved data in the state
        } else {
          console.error('Failed to fetch tasks from the server');
        }
      } catch (error) {
        console.error('Error while fetching tasks:', error);
      }
    }

    fetchTasksFromBackend();
  }, []);

  return (
    <div className="display-task">
      <h2 className="task-header">My Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong className="task-name">{task.name}</strong>
            <p className="task-description">{task.description}</p>
            <p className="task-deadline">Deadline: {task.deadline}</p>
            <p className="task-priority">Priority: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTask;
