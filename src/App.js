import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./component/Admin/Dashboard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./action/userAction";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UserList from "./component/Admin/UserList";
import ProductList from "./component/Admin/ProductList";
import TodoList from "./component/Admin/TodoList";
import NewTodo from "./component/Admin/NewTodo";
import UpdateTodo from "./component/Admin/UpdateTodo";
import UpdateUser from "./component/Admin/UpdateUser";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);

  axios.defaults.withCredentials = true;

  useEffect(() => {

    store.dispatch(loadUser());

  }, [])

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          {/* user list  */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UserList />
              </ProtectedRoute>
            }
          ></Route>

          {/* product list */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>



          {/* todo list */}
          <Route
            path="/admin/todos"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <TodoList />
              </ProtectedRoute>
            }
          ></Route>

          {/* create new todo  */}

          <Route
            path="/admin/todo/new"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <NewTodo />
              </ProtectedRoute>
            }
          ></Route>


          {/* update todo  */}

          <Route
            path="/admin/todo/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UpdateTodo />
              </ProtectedRoute>
            }
          ></Route>

          {/* update user list  */}
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              >
                <UpdateUser />
              </ProtectedRoute>
            }
          ></Route>

        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;
