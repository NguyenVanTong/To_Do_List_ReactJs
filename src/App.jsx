import React, { useState, useEffect, useRef, useMemo, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  
  const [todos, dispatch] = useReducer(todoReducer, JSON.parse(localStorage.getItem("todos")) || []);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      dispatch({ type: "SET", payload: storedTodos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(
    () => ({
      incomplete: todos.filter((todo) => !todo.completed),
      completed: todos.filter((todo) => todo.completed),
    }),
    [todos]
  );

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    dispatch({ type: "ADD", payload: newTodo });
    setInputValue("");
    inputRef.current.focus();
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <div className="container">
      <h1 className="text-center">To-Do List</h1>

      <div className="input-group mb-3">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Nhập công việc..."
        />
        <button className="btn btn-primary text-white" onClick={handleAddTodo}>
          Add To Do
        </button>
      </div>
      <h2 className="mt-4 text-center">Chưa hoàn thành</h2>
      <ul className="list-group">
        {filteredTodos.incomplete.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded "
          >
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
            <button
              className="btn btn-danger text-white"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-4 text-center">Đã hoàn thành</h2>
      <ul className="list-group">
        {filteredTodos.completed.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded"
          >
            <del onClick={() => handleToggleTodo(todo.id)}>{todo.text}</del>
            <button
              className="btn btn-danger text-white"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
