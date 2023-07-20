import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
uuidv4();
function TodoWrapper() {
  const [todoObj, setTodoObj] = useState([]);
  // Each task TodoForm is taken as each todo
  const addTodo = (todo) => {
    // console.log(todo);
    setTodoObj([
      ...todoObj,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    // console.log(todoObj);
  };

  const deleteListItem = (id) => {
    // Copy Previous Array
    let newTodoArray = [...todoObj];
    newTodoArray.splice(id, 1);
    setTodoObj([...newTodoArray]); // Copy the array after deleting wrt to id.
  };

  const toggleComplete = (id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      )
    );
  };

  const editListItem = (id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  const editTask = (editedTask, id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, task: editedTask, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Schedule You Day!</h1>
      <TodoForm addTodo={addTodo} />

      {todoObj.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            editListItem={editTask}
            todoItem={todo.task}
            key={todo.id}
            id={todo.id}
          />
        ) : (
          <Todo
            todoItem={todo.task}
            key={todo.id}
            index={todo.id}
            completed={todo.completed}
            toggleComplete={toggleComplete}
            deleteListItem={deleteListItem}
            editListItem={editListItem}
          />
        )
      )}
    </div>
  );
}

export default TodoWrapper;
