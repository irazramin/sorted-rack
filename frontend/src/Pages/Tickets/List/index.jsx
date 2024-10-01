import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TicketList = () => {
  return (
    <div className="flex-grow-1 mt-3 h-100 w-100 px-4">
      <div className="row">
        <div className="col-6">
          <h3>All Tickets</h3>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Link to="/ticket/create">
            <Button variant="primary mb-2 float-right">Create Ticket</Button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TicketList;
