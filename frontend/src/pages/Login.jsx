import React, { useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigate,
  redirect,
} from "react-router-dom";

const Login = () => {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary m3">
          Submit
        </button>
        <Link className="m-3 btn btn-success" to="/signup">
          I'm new user!
        </Link>
      </Form>
    </div>
  );
};

export default Login;

export const action = async ({ request }) => {
  const data = await request.formData();
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("https://gofood-backend-8dqe.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (!response.ok) {
    console.log("ERROR");
    if (resData && resData.message && resData.message.length > 4) {
      window.alert(resData.message);
      resData.message = "";
      return null;
    }
  }
  console.log(resData);
  if (resData && resData.authToken && resData.authToken.length > 5) {
    localStorage.setItem("authToken", resData.authToken);
    return redirect("/");
  }
};
