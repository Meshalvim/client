import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import LogIn from './LogIn';
import HomePage from './HomePage';
import EmployerDetails from './EmployerDetails';
import EmployerForm from './EmployerForm';
import Manage from './Manage';
import DisabledForm from './DisabledForm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/employerDetails" element={<EmployerDetails />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/disabledForm" element={<DisabledForm />} />
          <Route path="/employerForm" element={<EmployerForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
