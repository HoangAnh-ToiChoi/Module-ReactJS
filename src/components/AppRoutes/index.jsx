import { BrowserRouter, Route, Routes } from "react-router";

//Layouts
import DefaultLayout from "~/layouts/DefaultLayout";
import AuthLayout from "~/layouts/AuthLayout";

//Pages
import Home from "~/pages/Home";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import ForgotPassword from "~/pages/Auth/ForgotPassword";
import ResetPassword from "~/pages/Auth/ResetPassword";

// Components
import AuthProvider from "~/components/AuthProvider";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
