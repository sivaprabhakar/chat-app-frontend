
import React from "react";
import Message from "../Components/Message";
import { Routes,Route,Navigate} from "react-router-dom";
import Register from "../pages/Register"
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import AuthLayout from "../layout/AuthLayout";



function AppRoutes() {
  return (
    <>
   
   <Routes>
      <Route path="/" element={<Home />}>
        {/* Define child routes within the parent route */}
        <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="email" element={<AuthLayout><CheckEmail /></AuthLayout>} />
        <Route path="password" element={<AuthLayout><CheckPassword /></AuthLayout>} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path=":userId" element={<Message />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>


   
   
    </>
  )
}

export default AppRoutes