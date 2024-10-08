import React, { useEffect, useState } from "react";
import "./style.scss";
import Title from "../../component/Shared/Title";
import { userHeader } from "../../Utility/userHeader";
import { axiosSecure } from "../../api/axios";
import { formatCreatedAt } from "../../Utility/dateFormatter";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import CommentSidebar from "../../Common/CommentSidebar";
import { ticketStatus } from "../Tickets/utils/ticketStatus";
import { toast } from "react-toastify";
import CustomModal from "../../Common/Modal";
const RequestedTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosSecure.get("/admin/ticket", {
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

  const handleCommentSectionShow = (id) => {
    setShowCommentSidebar((prevState) => !prevState);
    setSelectedTicket(id);
  };

  const fetchingSingleTicket = async () => {
    try {
      const response = await axiosSecure.get(
        `/admin/ticket/${selectedTicket}`,
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );
      setComments(response?.data?.data?.comments);
      setTicket(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingSingleTicket();
  }, [selectedTicket]);

  const handleStatusChange = async (id, statusText) => {
    try {
      const response = await axiosSecure.put(
        `/admin/ticket/${id}/change-status`,
        {
          ticketStatus: statusText,
        },
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );

      if (response) {
        toast.success(`Ticket is now on ${statusText}`);
        setStatus((prevState) => ({
          ...prevState,
          [id]: statusText,
        }));
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

  return (
    <div className="p-4">
      <div className="mb-4 p-3 title-bar d-flex align-content-center justify-content-between">
        <Title title="All Request Tickets" className="m-0" />
        <div className="filter">
          <select name="" id="">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          <div class="custom-select"></div>
          <div class="custom-select">
            <select name="" id="">
              <option value="" disabled selected>
                Select a status
              </option>
              {ticketStatus?.map((ticket) => (
                <>
                  <option value={ticket.value}>{ticket.label}</option>
                </>
              ))}
            </select>
          </div>
          <div class="custom-select">
            <select name="" id="">
              <option value="" disabled selected>
                Select a priority
              </option>

              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="" style={{ height: "70vh" }}>
        <table className="table">
          <thead>
            <tr className="bg-light">
              <th scope="col">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col">#TicketID</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Created</th>
              <th scope="col" className="text-center">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets?.length > 0 &&
              tickets?.map((ticket) => {
                return (
                  <tr>
                    <td scope="row">
                      <input className="form-check-input" type="checkbox" />
                    </td>
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
                      <Dropdown>
                        <Dropdown.Toggle
                          // variant="success"
                          id="dropdown-basic"
                          className={`dropd ${
                            status[ticket?._id]
                              ? status[ticket?._id]
                                  .toLowerCase()
                                  .split(" ")
                                  .join("-")
                              : ticket?.ticketStatus
                                  .toLowerCase()
                                  .split(" ")
                                  .join("-")
                          } d-flex align-items-center px-2 justify-content-between p-1 w-100`}
                        >
                          {status[ticket?._id]
                            ? status[ticket?._id]
                            : ticket?.ticketStatus}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {ticketStatus?.map((statusText) => (
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => {
                                const statusNow = statusText.value;
                                handleStatusChange(ticket?._id, statusNow);
                                // setStatus((prevState) => ({
                                //   ...prevState,
                                //   [ticket?._id]: statusText.value,
                                // }));
                              }}
                            >
                              {statusText.value}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>{formatCreatedAt(ticket?.createdAt)}</td>
                    <td className="action-wrapper ">
                      <button
                        className="table-action details"
                        onClick={() => {
                          handleCommentSectionShow(ticket?._id);
                        }}
                      >
                        <i class="bi bi-eye-fill"></i>
                      </button>

                      <button
                        className="table-action delete"
                        onClick={() => {
                          handleShow(ticket?._id);
                        }}
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <CustomModal
        show={show}
        handleClose={handleClose}
        title="Are you sure?"
        handleAction={deleteSingleTicket}
        message="If you delete this ticket, I'll will be delete forever"
      />
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
    </div>
  );
};

export default RequestedTickets;
