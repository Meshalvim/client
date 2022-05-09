import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignInWorker from './SignInWorker';
import SignInEmployer from './SignInEmployer';
import LogIn from './LogIn';
import HomePage from './HomePage';
import About from './About';
import Manager from './Manager';
import CandidateForm from './CandidateForm';
import EmployerDemands from './EmployerDemands';
import AppBar from './AppBar';
import Scheduling from './Scheduling';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AppBar></AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signInWorker" element={<SignInWorker />} />
          <Route path="/SignInEmployer" element={<SignInEmployer />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/candidateForm" element={<CandidateForm />} />
          <Route path="/employerDemands" element={<EmployerDemands />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/scheduling" element={<Scheduling/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
