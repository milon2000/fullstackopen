import React from 'react'

const LoginForm = ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>log in to application</h2>
            <div>
            username
                <input 
                type = "text"
                value = {username}
                name = "Username"
                onChange = {handleUsernameChange}>
                </input>  
            </div>
            <div>
            password
                <input
                type = "password"
                value = {password}
                name = "Password"
                onChange = {handlePasswordChange}
                ></input>
            </div> 
            <button type = "submit">login</button>
        </form>
    </div>
    )   
}

export default LoginForm