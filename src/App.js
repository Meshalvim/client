import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import LogIn from './LogIn';
import HomePage from './HomePage';
import EmployerDetails from './EmployerDetails';
import Manage from './Manage';
import DisabledForm from './DisabledForm';

function App() {
  return (
    <div>
      <DisabledForm/>
      <Manage/>
      <HomePage/>
      <SignIn/>
      <LogIn/>
      <EmployerDetails/>
    </div>
  );
}

export default App;
