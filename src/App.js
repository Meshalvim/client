import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import LogIn from './LogIn';
import HomePage from './HomePage';
import EmployerDetails from './EmployerDetails';
import Manage from './Manage';
import DisabledForm from './DisabledForm';
import EmployerDemands from './EmployerDemands';
import AppBar from './AppBar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AppBar></AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/employerDetails" element={<EmployerDetails />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/DisabledForm" element={<DisabledForm />} />
          <Route path="/employerDemands" element={<EmployerDemands />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
