import React from "react";
import { Link, Form, redirect, useActionData } from "react-router-dom";

const Signup = () => {
  const actionData = useActionData();
  if (actionData && actionData.message.length > 4) {
    console.log(actionData, "ERROR");
    window.alert(actionData.message);
    actionData.message = ""
  }
  return (
    <div className="container">
      <Form method="post">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>
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
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
          />
        </div>
        <button type="submit" className="btn btn-primary m3">
          Submit
        </button>
        <Link className="m-3 btn btn-success" to="/login">
          Already a user?
        </Link>
      </Form>
    </div>
  );
};

export default Signup;

export const action = async ({ request }) => {
  const data = await request.formData();
  const userData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    location: data.get("location"),
  };
  const response = await fetch("https://gofood-backend-8dqe.onrender.com/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  console.log(userData, "USERdATA");
  if (!response.ok) {
    console.log(response);
    return response;
  }
  return redirect("/login");
};
