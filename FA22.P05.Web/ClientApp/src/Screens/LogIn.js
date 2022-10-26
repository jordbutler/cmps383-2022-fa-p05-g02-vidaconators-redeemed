import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
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
  
  

    return(

        <div color="Red">

        

        <form className="form">
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

          <Button type="button" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>

      

        </div>
    )

}