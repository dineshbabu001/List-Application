// Import necessary dependencies
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Main App component
const App = () => {
  // State for managing to-do list items
  const [todos, setTodos] = useState([]);

  // State for managing input field value
  const [todoText, setTodoText] = useState("");

  // UseEffect for logging when to-do list changes
  useEffect(() => {
    console.log("To-Do List updated:", todos);
    // Optional: Persist to-do list in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to handle adding a new to-do item
  const addTodo = () => {
    if (todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, id: Date.now() }]);
      setTodoText("");
    }
  };

  // Function to handle deleting a to-do item
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to handle editing a to-do item
  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  // Retrieve saved to-do list from local storage on initial load
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // JSX for the main application
  return (
    <div className="container mt-5">
      <h1 className="mb-4">To-Do List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Add a new to-do"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.text}
            <div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  const newText = prompt("Edit your to-do:", todo.text);
                  if (newText !== null) {
                    editTodo(todo.id, newText);
                  }
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
