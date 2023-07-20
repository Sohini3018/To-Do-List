import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Todo(props) {
  return (
    <div className="Todo">
      <p
        className={`${props.completed ? "completed" : ""}`}
        onClick={() => props.toggleComplete(props.index)}
      >
        {props.todoItem}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => {
            props.editListItem(props.index);
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            props.deleteListItem(props.index);
          }}
        />
      </div>
    </div>
  );
}

export default Todo;
