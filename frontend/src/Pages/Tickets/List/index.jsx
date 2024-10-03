import React, { useEffect } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ticketList.scss";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import { userHeader } from "../../../Utility/userHeader";
const TicketList = () => {
  const [response, error, loading, axiosFetch] = useAxios();
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    axiosFetch({
      axiosInstance: axiosSecure,
      method: "GET",
      url: `/ticket`,
      requestConfig: [
        {
          headers: {
            Authorization: userHeader(),
          },
        },
      ],
    });
  };

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
                  <td>
                    <span className="ticket-id">{ticket?._id}</span>
                  </td>
                  <td>{ticket?.ticketCategory}</td>
                  <td className="priority">
                    <span
                      className={`chip px-3 rounded ${ticket?.ticketPriority.toLowerCase()}`}
                    >
                      {ticket?.ticketPriority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`chip ${ticket?.ticketStatus
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                    >
                      {ticket?.ticketStatus}
                    </span>
                  </td>
                  <td>{ticket?.createdAt}</td>
                  <td className="action-wrapper">
                    <Link to={`/ticket/edit/${ticket?._id}`}>
                      <button className="edit table-action">
                        <i class="bi bi-pencil"></i>
                      </button>
                    </Link>

                    <button className="table-action delete">
                      <i class="bi bi-trash"></i>
                    </button>

                    <button className="table-action details">
                      <i class="bi bi-eye-fill"></i>
                    </button>
                  </td>
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
