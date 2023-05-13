import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    if (document.activeElement.name === 'Login') {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } catch (error) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Incorrect email or password.',
              showConfirmButton: true,
            });
          },
        });
      }
    } else if (document.activeElement.name === 'Register') {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully registered and logged in!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } catch (error) {
        console.log(error)
      }
    }

    
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" name="Login" />
        <input style={{ marginTop: '12px', marginLeft: '12px', backgroundColor: 'black' }} type="submit" value="Register" name="Register" />
      </form>
    </div>
  );
};

export default Login;
