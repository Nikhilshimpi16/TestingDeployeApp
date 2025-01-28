import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componets/Dashboard';
import LoginForm from './Componets/LoginForm';
import RegistrationForm from './Componets/RegistrationForm';
import Logout from './Componets/Logout';
import UpdatePassword from './Componets/updatePassword';
import AdminDashboard from './Componets/AdminDashboard';
import WaterBillSearch from './Componets/WaterBillSearch';
import EmployeeLogin from './Componets/EmployeeLogin';
import EmployeeDashboard from './Componets/EmployeeDashboard';



export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>

    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Dashboard />} />
       
        {/* <Route path="/user-rights" element={<UserRights />} /> */}
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/waterbillsearch" element={<WaterBillSearch />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
       <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </UserContext.Provider>

  );
};

export default App;
