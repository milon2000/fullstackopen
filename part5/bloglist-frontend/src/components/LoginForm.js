import React from 'react'

const LoginForm = ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>log in to application</h2>
            <div>
            username
                <input id = 'username'
                type = "text"
                value = {username}
                name = "Username"
                onChange = {handleUsernameChange}>
                </input>  
            </div>
            <div>
            password
                <input
                id = 'password'
                type = "password"
                value = {password}
                name = "Password"
                onChange = {handlePasswordChange}
                ></input>
            </div> 
            <button id = 'login-button' type = "submit">login</button>
        </form>
    </div>
    )   
}

export default LoginForm