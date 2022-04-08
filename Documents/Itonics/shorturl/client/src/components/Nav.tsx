import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login')
  }
  return (<nav className="navbar nav-sm">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">tt.com</Link>
      <div className="d-flex">
        {
          localStorage.getItem('token') ? (<button className="btn btn-sm btn-outline-light" onClick={onLogout}>
            Logout
          </button>) : (<> <Link className="btn btn-sm btn-outline-light mr-2" to="login">
            Login
          </Link>
            <Link className="btn btn-sm btn-outline-light" to="register">
              Signup
            </Link></>)
        }
      </div>
    </div>
  </nav>)
}