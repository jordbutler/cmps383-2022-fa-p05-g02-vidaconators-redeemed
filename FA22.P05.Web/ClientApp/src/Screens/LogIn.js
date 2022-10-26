import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';




export function LoginScreen() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
 

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

      axios.post('/api/authentication/login', {userName: username, password: password});
  
  };
  
  

    return(

        <div color="Red">

        

        <form className="form" onSubmit={handleLogin}>
          <TextField
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
          <TextField
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChangePassword}
          />

          <Button type="submit" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>

      

        </div>
    )

}