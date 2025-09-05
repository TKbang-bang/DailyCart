import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { signup } from "../Services/auth.service";
import { toast } from "sonner";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sign = await signup(
        firstName,
        lastName,
        email,
        password,
        confPassword,
        code
      );

      if (!sign.ok) throw new Error(sign.message);

      toast.success(sign.message);
      navigate("/");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>

        <div className="name">
          <article className="feild_container">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </article>

          <article className="feild_container">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </article>
        </div>

        <article className="feild_container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </article>

        <article className="feild_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            maxLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </article>

        <article className="feild_container">
          <label htmlFor="conf-password">Confirm your password</label>
          <input
            type="password"
            id="conf-password"
            maxLength={12}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </article>

        <article className="feild_container">
          <label htmlFor="code">
            Code <span>(Optional)</span>
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </article>

        <button type="submit">Sign up</button>

        <p className="or">Or</p>

        <p className="other">
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
