import React, { useState } from "react";

function EditTodoForm(props) {
  const [task, setTask] = useState(props.todoItem);
  const handleChange = (event) => {
    setTask(event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(task);
    if (task !== "") {
      props.editListItem(task, props.id);
    }
    setTask("");
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      if (task !== "") {
        props.editListItem(task);
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
        placeholder="Edit Your Task"
        value={task}
        onChange={handleChange}
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
}

export default EditTodoForm;
