const Login = () => {
  return (
    <div className="form-container">
      <form className="inner-container">
        <h2 className="form-title">Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="doe@gmail.com"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="***********"
          />
        </div>

        <a className="forgot-password" to="/forgot-password">
          Forgot Password
        </a>

        <div className="form-group">
          <input className="button" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
