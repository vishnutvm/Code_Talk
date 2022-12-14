import React from 'react';
import adminLoginSvg from './img/img.svg';
import './AdminLogin.css';

function AdminLogin() {
  return (
    <div>
      <section className="side">
        <img src={adminLoginSvg} alt="AdminLogin" />
      </section>
      <section className="main">
        <div className="login-container">
          <p className="title">Welcome back</p>
          <div className="separator" />
          <p className="welcome-message">
            Please, provide login credential to proceed and have access to all
            our services
          </p>
          <form className="login-form">
            <div className="form-control">
              <input type="text" placeholder="Username" />
              <i className="fas fa-user" />
            </div>
            <div className="form-control">
              <input type="password" placeholder="Password" />
              <i className="fas fa-lock" />
            </div>
            {/* <button className="submit">Login</button> */}
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
