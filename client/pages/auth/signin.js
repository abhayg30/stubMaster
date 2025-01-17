import { useState } from "react";
import Router from "next/router";
import UseRequest from "../../hooks/use-request";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = UseRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {email, password},
    onSuccess: () => Router.push('/')
  })
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
