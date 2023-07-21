import React from 'react'
import { useUser } from '../context/UserContext'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouets = () => {
    const { userData } = useUser()
    return (
        <>
            {
                userData ? <Outlet /> : <Navigate to="/login"  />
            }
        </>
    )
}

export default PrivateRouets