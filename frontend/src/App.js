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

import AssignItem from "./Pages/AssignItems";
import TicketList from "./Pages/Tickets/List";
import TicketAdd from "./Pages/Tickets/Add";

function App() {
  return (
    <StockProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock" element={<ListStock />} />
          <Route path="stock/add" element={<AddStock />} />
          <Route path="stock/edit/:id" element={<EditSystemDetails />} />
          <Route path="allitems" element={<Allitems />} />
          <Route path="request" element={<Request />} />
          <Route path="user/add" element={<AddUser />} />
          <Route path="user" element={<ListUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="assigned/" element={<AssignItem />} />
          <Route path="ticket/" element={<TicketList />} />
          <Route path="ticket/create" element={<TicketAdd />} />
        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </StockProvider>
  );
}

export default App;
