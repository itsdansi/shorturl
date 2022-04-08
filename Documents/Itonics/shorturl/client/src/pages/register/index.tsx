import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppService } from "../../services/app.service";
import { toast } from "react-toastify";

import "./index.css";
export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const appService = new AppService();
  const navigate = useNavigate();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    const response = await appService.register(data);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      navigate("/login");
    }
  };
  return (
    <div className="container d-flex align-items-center justify-content-center w-200 h-100">
      <div className="row">
        <div className="centering col-md-12 h-100">
          <form action="" className="rform" onSubmit={onSubmit}>
            <label htmlFor="">Enter following details</label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input type="submit" className="form-control" value="SIGNUP" />
          </form>
        </div>
      </div>
    </div>
  );
}
