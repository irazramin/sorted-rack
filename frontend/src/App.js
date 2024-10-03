import React from "react";
import { Routes, Route } from "react-router-dom";
import StockProvider from "./contexts/StockContext";
import {
  Layout,
  LoginForm,
  PageNotFound,
  Dashboard,
  Allitems,
  Request,
  AddUser,
  ListUser,
  EditUser,
  ListStock,
  AddStock,
  EditSystemDetails,
} from "./Pages";
import "react-toastify/dist/ReactToastify.css";

import AssignItem from "./Pages/AssignItems";
import TicketList from "./Pages/Tickets/List";
import TicketAdd from "./Pages/Tickets/Add";
import TicketEdit from "./Pages/Tickets/Edit";
import { ToastContainer, toast } from "react-toastify";
import AdminGuard from "./component/Guard/AdminGuard";
import UserDashboard from "./Pages/UserDashboard";
import RequestedTickets from "./Pages/RequestedTickets";

function App() {
  return (
    <StockProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AdminGuard>
                <Dashboard />
              </AdminGuard>
            }
          />
          <Route path="user-dashboard" element={<UserDashboard />} />
          <Route
            path="stock"
            element={
              <AdminGuard>
                <ListStock />
              </AdminGuard>
            }
          />
          <Route
            path="stock/add"
            element={
              <AdminGuard>
                <AddStock />
              </AdminGuard>
            }
          />
          <Route
            path="stock/edit/:id"
            element={
              <AdminGuard>
                <EditSystemDetails />
              </AdminGuard>
            }
          />
          <Route
            path="allitems"
            element={
              <AdminGuard>
                <Allitems />
              </AdminGuard>
            }
          />
          <Route
            path="request"
            element={
              <AdminGuard>
                <Request />
              </AdminGuard>
            }
          />
          <Route
            path="user/add"
            element={
              <AdminGuard>
                <AddUser />
              </AdminGuard>
            }
          />
          <Route
            path="user"
            element={
              <AdminGuard>
                <ListUser />
              </AdminGuard>
            }
          />
          <Route
            path="user/edit/:id"
            element={
              <AdminGuard>
                <EditUser />
              </AdminGuard>
            }
          />
          <Route
            path="assigned/"
            element={
              <AdminGuard>
                <AssignItem />
              </AdminGuard>
            }
          />
          <Route
            path="requested-tickets/"
            element={
              <AdminGuard>
                <RequestedTickets />
              </AdminGuard>
            }
          />
          <Route path="ticket/" element={<TicketList />} />
          <Route path="ticket/create" element={<TicketAdd />} />
          <Route path="ticket/edit/:id" element={<TicketEdit />} />
        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </StockProvider>
  );
}

export default App;
