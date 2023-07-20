import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");
  const handleChange = (event) => {
    setTask(event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(task);
    if (task !== "") {
      addTodo(task);
    }
    setTask("");
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      if (task !== "") {
        addTodo(task);
      }
      setTask("");
    }
  };
  return (
    <form
      className="Todo-Form"
      onSubmit={handleSubmit}
      onKeyDown={handleEnterPress}
    >
      <input
        type="text"
        className="todo-input"
        placeholder="What Is The Task Today?"
        value={task}
        onChange={handleChange}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
