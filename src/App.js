import { Route, Routes } from "react-router-dom";
import Home from "./pages/website/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Users from "./pages/dashboard/Users";
import Google from "./pages/dashboard/Google";
import Dashboard from "./pages/dashboard/Dashboard";
import RequiredAuth from "./auth/RequiredAuth";
import EditUsers from "./pages/dashboard/EditUsers";
import AddUser from "./pages/dashboard/AddUser";
import Writer from "./pages/dashboard/Writer";
import Error404 from "./components/Error404";
import RequiredBack from "./auth/RequiredBack";
import Catigores from "./pages/dashboard/Catigores";
import AddCatigores from "./pages/dashboard/AddCatigores";
import EditCategories from "./pages/dashboard/EditCategories";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/AddProduct";
import EditProduct from "./pages/dashboard/EditProducts";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {/* <Route element={<RequiredBack />}> */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      {/* </Route> */}

      <Route path="/auth/google/callback" element={<Google />}></Route>
      <Route path="/*" element={<Error404 />} />
      <Route
        element={<RequiredAuth AuthPermission={["2004", "1995", "1999"]} />}
      >
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequiredAuth AuthPermission={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<EditUsers />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>
          <Route element={<RequiredAuth AuthPermission={["1999", "1995"]} />}>
            {/* Catigores */}
            <Route path="categories" element={<Catigores />} />
            <Route path="categories/:id" element={<EditCategories />} />
            <Route path="category/add" element={<AddCatigores />} />
            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<EditProduct />} />
            <Route path="product/add" element={<AddProduct />} />
          </Route>
          <Route element={<RequiredAuth AuthPermission={["2004", "1995"]} />}>
            <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
