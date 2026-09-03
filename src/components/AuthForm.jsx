import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ mode = "login", title, onSubmit }) => {
  const isLogin = mode === "login";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const heading = title || (isLogin ? "Login" : "Sign Up");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-heading">{heading}</h1>

      {!isLogin && (
        <>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </>
      )}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn btn-primary">
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <Link
        to={isLogin ? "/signup" : "/login"}
        className="auth-switch-link"
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </Link>
    </form>
  );
};

export default AuthForm;