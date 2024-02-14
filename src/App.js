// Import necessary dependencies
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Load from local storage on component mount
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    // Save to local storage when the todoList changes
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log("Todo list updated:", todoList);
  }, [todoList]);

  const addTodo = () => {
    if (inputText.trim() !== "") {
      setTodoList([...todoList, { text: inputText, done: false }]);
      setInputText("");
    }
  };

  const deleteTodo = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const toggleDone = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].done = !newTodoList[index].done;
    setTodoList(newTodoList);
  };

  const editTodo = (index, newText) => {
    const newTodoList = [...todoList];
    newTodoList[index].text = newText;
    setTodoList(newTodoList);
  };

  return (
    <div className="container mt-4">
      <h1> List App</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todoList.map((todo, index) => (
          <li
            key={index}
            className={`list-group-item ${
              todo.done ? "list-group-item-success" : ""
            }`}
          >
            {todo.done ? <del>{todo.text}</del> : todo.text}
            <div className="float-end">
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => toggleDone(index)}
                disabled={todo.done}
              >
                {todo.done ? "Undo" : "Done"}
              </button>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  const newText = prompt("Edit todo:", todo.text);
                  if (newText !== null) {
                    editTodo(index, newText);
                  }
                }}
                disabled={todo.done}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTodo(index)}
                disabled={todo.done}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
