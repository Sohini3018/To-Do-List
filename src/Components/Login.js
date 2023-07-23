import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useUser } from '../context/UserContext'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { userData, setUserData } = useUser()
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handlSubmit = async (e) => {
        e.preventDefault();
        if ((data.email && data.password))
            try {
                const response = await fetch("http://localhost:8000/api/v1/users/login", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": data.email,
                        "password": data.password
                    })
                })
                const val = await response.json()
                if (val.data.statusCode === 200) {
                    localStorage.setItem("user", JSON.stringify(val.data.value))
                    toast.success(val.data.value.value)
                    setUserData(val.data.value)
                    setData({ email: "", password: "" })
                    navigate("/")
                } else {
                    toast.error(val.data.value)
                }
            } catch (error) {
                console.log("error in request for storing user", error);
                toast.error(error.message)
            }
    }

    useEffect(() => {
        console.log("logged in val", userData);
        if (localStorage.getItem("user") !== null) {
            setUserData(data)
            navigate("/")
        }
    }, [])

    return (
        <div className="container">
            <form className="form">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <div className="form-floating">
                    <label htmlFor="email" className='form-label'>Email address</label>
                    <input type="email" className="form-input" id="email" placeholder="Enter your email id" value={data.email} onChange={(e) => setData(prev => ({ ...prev, "email": e.target.value }))} />
                </div>
                <div className="form-floating">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" className="form-input" id="password" placeholder="Enter you password" value={data.password} onChange={(e) => setData(prev => ({ ...prev, "password": e.target.value }))} />
                </div>
                <button className="btn" type="submit" id="signin" onClick={handlSubmit}>Sign in</button>
                <div className='change-page'>
                    <p style={{ color: 'white', margin: "0px 10px" }}>Don't have account?</p>
                    <Link to="/signup" style={{ color: "#F4D160" }}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login