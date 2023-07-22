import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import toast, { Toaster } from 'react-hot-toast';

uuidv4();
function TodoWrapper() {
  const [todoObj, setTodoObj] = useState([]);
  let userId = JSON.parse(localStorage.getItem("user")).userID

  // fetchTodos 
  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/todo/${userId}`)
      const todoData = await response.json()
      if (todoData.data.statusCode === 200) {
        setTodoObj(todoData.data.value)
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  // Each task TodoForm is taken as each todo
  const addTodo = async (todo) => {
    console.log(userId);
    try {
      const response = await fetch("http://localhost:8000/api/v1/todo/todoCreate", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "todo": todo,
          "isComplete": false,
          "user": userId
        })

      })
      const todoData = await response.json()
      if (todoData.data.statusCode === 201) {
        toast.success("Todo added successfully")
        fetchTodos()
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteListItem = async (id) => {
    // Copy Previous Array
    try {
      const response = await fetch(`http://localhost:8000/api/v1/todo/${id}`, {
        method: "DELETE"
      })
      const data = await response.json()
      if (data.data.statusCode === 200) {
        toast.success("Todo deleted successfully")
        fetchTodos()
      }
    } catch (error) {
      console.log(error.message);
    }

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

  //! TODO: configure edit  

  const editListItem = (id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  const editTask = async (editedTask, id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, task: editedTask, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="TodoWrapper">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
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
            todoItem={todo.todo}
            key={todo._id}
            index={todo._id}
            completed={todo.isComplete}
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
