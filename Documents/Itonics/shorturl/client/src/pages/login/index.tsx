
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppService } from '../../services/app.service';
import { toast } from 'react-toastify';

import "./index.css"
export default function Index() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const appService = new AppService();
  const navigate = useNavigate()
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    const response = await appService.login({ email, password });
    console.log(response.user[0]);

    if (response.error) {
      toast.error(response.error);
    }
    else {
      toast.success(response.message);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user[0]));
      navigate("/dash", { replace: true })
    }
  }


  return (
    <div
      className="container d-flex align-items-center justify-content-center w-200 h-100"
    >
      <div className="row">
        <div className="centering col-md-12 h-100">
          <form action="" className='lform' onSubmit={onSubmit}>
            <label htmlFor="">Enter your credentials</label><br />
            <input
              type="email"
              className="form-control"
              required
              placeholder="Email" onChange={(e) => setEmail(e.target.value)}
            /><br />
            <input
              type="password"
              className="form-control" required
              placeholder="Password" onChange={(e) => setPassword(e.target.value)}
            /><br />
            <input type="submit" className="form-control" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  )
}
