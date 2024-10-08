import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ticketList.scss";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import { userHeader } from "../../../Utility/userHeader";
import CustomModal from "../../../Common/Modal";
import { toast } from "react-toastify";
import CommentSidebar from "../../../Common/CommentSidebar";
import { formatCreatedAt } from "../../../Utility/dateFormatter";

const TicketList = () => {
  // const [error, loading, axiosFetch] = useAxios();
  const [show, setShow] = useState(false);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosSecure.get("/ticket", {
        headers: { Authorization: userHeader() },
      });

      console.log(res);

      if (res) {
        setTickets(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setSelectedTicket("");
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
    setSelectedTicket(id);
  };

  const deleteSingleTicket = async () => {
    try {
      const res = await axiosSecure.delete(`/ticket/${selectedTicket}`, {
        headers: { Authorization: userHeader() },
      });

      if (res) {
        setSelectedTicket("");
        setTickets((prevState) => {
          const newTickets = prevState?.filter(
            (ticket) => ticket?._id !== selectedTicket
          );
          return newTickets;
        });

        toast.success("Ticket deleted successfully!");
        setShow(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSectionShow = (id) => {
    setShowCommentSidebar((prevState) => !prevState);
    setSelectedTicket(id);
  };

  const fetchingSingleTicket = async () => {
    try {
      const response = await axiosSecure.get(`/ticket/${selectedTicket}`, {
        headers: {
          Authorization: userHeader(),
        },
      });
      setComments(response?.data?.data?.comments);
      setTicket(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingSingleTicket();
  }, [selectedTicket]);

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
            {Array.isArray(tickets) &&
              tickets?.map((ticket) => {
                return (
                  <tr key={ticket?._id}>
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
                    <td>{formatCreatedAt(ticket?.createdAt)}</td>
                    <td className="action-wrapper">
                      <Link to={`/ticket/edit/${ticket?._id}`}>
                        <button className="edit table-action">
                          <i class="bi bi-pencil"></i>
                        </button>
                      </Link>

                      <button
                        className="table-action delete"
                        onClick={() => handleShow(ticket?._id)}
                      >
                        <i class="bi bi-trash"></i>
                      </button>

                      <button
                        className="table-action details"
                        onClick={() => {
                          handleCommentSectionShow(ticket?._id);
                        }}
                      >
                        <i class="bi bi-eye-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <CustomModal
        show={show}
        handleClose={handleClose}
        title="Are you sure?"
        handleAction={deleteSingleTicket}
        message="If you delete this ticket, I'll will be delete forever"
      />
      {/* {showCommentSidebar && ( */}
      <div
        onClick={() => setShowCommentSidebar(false)}
        className={`comment-sidebar-wrapper ${
          showCommentSidebar ? "show" : ""
        }`}
      >
        <CommentSidebar
          setShowCommentSidebar={setShowCommentSidebar}
          showCommentSidebar={showCommentSidebar}
          selectedTicket={selectedTicket}
          comments={comments}
          setComments={setComments}
          setTicket={setTicket}
          ticket={ticket}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default TicketList;
