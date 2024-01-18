'use client'
import React, {useState, FormEventHandler} from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
//Actions
import {usernameAction} from '../redux/reducers/userSlice';
import {useHandleUserLoginMutation} from '../redux/services/userService';

export default function Home() {
  const currUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [handleUserLogin, { isLoading, data, error }] = useHandleUserLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin : FormEventHandler<HTMLFormElement> = async (event) =>{
    event.preventDefault();
    try {
      const result = await handleUserLogin({username: username, password:password});
      //update the user state in the slice by dispatching an action
    }
    catch(error){
    }
  };
  return (
    <main>
      <form onSubmit={handleLogin} >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  )
};
