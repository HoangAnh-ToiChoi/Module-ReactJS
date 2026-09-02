import { BrowserRouter, Route, Routes } from "react-router";

//Layouts
import DefaultLayout from "~/layouts/DefaultLayout";

//Pages
import Home from "~/pages/home";

function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
