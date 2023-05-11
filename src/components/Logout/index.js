import React from 'react';
import Swal from 'sweetalert2';

import { getAuth, signOut } from "firebase/auth";

const Logout = ({ setIsAuthenticated }) => {

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      Swal.fire({
        icon: 'question',
        title: 'Logging Out',
        text: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then(result => {
        if (result.value) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              setIsAuthenticated(false);
            },
          });
        }
      });
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
