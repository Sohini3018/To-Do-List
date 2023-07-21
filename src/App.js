import TodoWrapper from "./Components/TodoWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup"
import UserContextProvider from "./context/UserContext";
import PrivateRouets from "./Components/PrivateRouets";

export default function App() {
  // return <TodoWrapper />;
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRouets/>}>
            <Route path="/" element={<TodoWrapper/>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}
