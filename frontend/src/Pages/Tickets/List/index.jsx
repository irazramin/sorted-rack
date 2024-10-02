import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ticketList.scss";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import { userHeader } from "../../../Utility/userHeader";
const TicketList = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  useEffect(() => {
    const fetchUserDetails = async () => {
      axiosFetch({
        axiosInstance: axiosSecure,
        method: "GET",
        url: `/ticket`,
        requestConfig: [
          {
            headers: userHeader(),
          },
        ],
      });
    };

    fetchUserDetails();
  }, []);

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
      <div className="ticket-table">
        <Table striped hover>
          <thead>
            <tr>
              <th>TicketId</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {response?.data?.map((ticket) => {
              return (
                <tr>
                  <td>{ticket?._id}</td>
                  <td>{ticket?.ticketCategory}</td>
                  <td>{ticket?.priority}</td>
                  <td>{ticket?.status}</td>
                  <td>{ticket?.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TicketList;
