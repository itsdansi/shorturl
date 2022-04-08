import './App.css';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Nav';
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Main from "./pages/main"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>

        <Route path="/dash" element={<PrivateOutlet />}>
          <Route path="/dash" element={<Main />} />
        </Route>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
const useAuth = () => {
  return localStorage.getItem('token') ? true : false;
};
export default App;

