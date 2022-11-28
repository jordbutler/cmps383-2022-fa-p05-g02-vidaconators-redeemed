import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
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
          Username:<TextField
            type="username"
            className="form-control"
            name="Username"
            value={username}
            onChange={onChangeUsername}
          />
          <br></br>
          <br></br>
          
          &emsp;&emsp;&emsp;&emsp;Password:<TextField
            type="password"
            className="form-control"
            name="Password"
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