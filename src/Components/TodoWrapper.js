import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

uuidv4();
function TodoWrapper() {
  const navigate = useNavigate()
  const [todoObj, setTodoObj] = useState([]);
  const [userId, setUserId] = useState()

  // fetchTodos 
  const fetchTodos = async () => {
    let val;
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      val = JSON.parse(localStorage.getItem("user")).userID
      setUserId(JSON.parse(localStorage.getItem("user")).userID)
    }
    try {
      // console.log(userId);
      const response = await fetch(`http://localhost:8000/api/v1/todo/${val}`)
      const todoData = await response.json()
      // console.log(data);
      if (todoData.data.statusCode === 200) {
        setTodoObj(todoData.data.value)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Each task TodoForm is taken as each todo
  const addTodo = async (todo) => {
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

  const toggleComplete = async (id) => {
    let element = todoObj.find((el) => el._id === id)
    let complete = !element.isComplete
    const response = await fetch(`http://localhost:8000/api/v1/todo/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isComplete: complete
      })
    })
    const data = await response.json()
    console.log(data.data);
    if (data.data.statusCode === 200) {
      fetchTodos()
      if (complete) {
        toast.success("Todo marked completed")
      } else {
        toast.success("Todo unmarked completed")
      }
    }
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem._id === id
          ? { ...todoItem, isComplete: !complete }
          : todoItem
      )
    );
  };

  //! TODO: configure edit  

  const editListItem = (id) => {
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem._id === id
          ? { ...todoItem, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  const editTask = async (editedTask, id) => {
    console.log("edited Task", editedTask);
    const response = await fetch(`http://localhost:8000/api/v1/todo/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: editedTask
      })
    })
    const data = await response.json()
    console.log(data.data);
    if (data.data.statusCode === 200) {
      fetchTodos()
      toast.success("Todo updated successfully")
    }
    setTodoObj(
      todoObj.map((todoItem) =>
        todoItem._id === id
          ? { ...todoItem, task: editedTask, isEditing: !todoItem.isEditing }
          : todoItem
      )
    );
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    if (userId !== null) {
      fetchTodos()
    }
  }, [])

  return (
    <div className="TodoWrapper">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Schedule You Day!</h1>
        <button onClick={handleLogout} className="logout-button">logout</button>
      </div>
      <TodoForm addTodo={addTodo} />

      {todoObj.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            editListItem={editTask}
            todoItem={todo.todo}
            key={todo._id}
            id={todo._id}
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
