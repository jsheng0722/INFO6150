import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/LoginPage.css"

export default function LoginPage({ onLoginSubmit }){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: username, password: password }),
            });
            if (response.ok) {
                onLoginSubmit();
                navigate("/home");
                alert("Welcome!");
            } else {
                const data = await response.json();
                throw new Error(data.message);
                
            }
        } catch (error) {
            alert('Failed to signin');
            throw new Error(`Failed to signin: ${error.message}`);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
        <div className="login-page">
            <h1> Login Page</h1>
            <form onSubmit={handleSignIn}>
                <label>
                    Username:
                    <input type="text" className="login-input" value={username} onChange={handleUsernameChange} />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" className="login-input" value={password} onChange={handlePasswordChange} />
                </label>
                <br/>
                <button type="submit" className="login-button">Sign In</button>
            </form>
        </div>
    )
}