import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoApp.css";

const TodoApp = () => {
  // State for managing to-do list items
  const [todos, setTodos] = useState([]);

  // State for managing input field value
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Load todos from local storage on mount
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever the todos state changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle adding a new to-do item
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  // Function to handle deleting a to-do item
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Function to handle editing a to-do item
  const handleEditTodo = (index) => {
    const updatedText = prompt("Edit todo:", todos[index]);
    if (updatedText !== null) {
      const updatedTodos = [...todos];
      updatedTodos[index] = updatedText;
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4"> List App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new search"
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo}
            <div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleEditTodo(index)}
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

export default TodoApp;
