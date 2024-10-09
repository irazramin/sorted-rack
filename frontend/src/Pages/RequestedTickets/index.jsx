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
import { ticketCategories } from "../Tickets/utils/ticketCategories";
import { ticketPriorities } from "../Tickets/utils/ticketPriorities";
const RequestedTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState({
    category: "",
    priority: "",
    status: "",
    search: "",
  });
  useEffect(() => {
    fetchUserDetails();
  }, [query]);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosSecure.get(
        `/admin/ticket?category=${query.category}&priority=${query?.priority}&status=${query.status}&search=${query.search}`,
        {
          headers: { Authorization: userHeader() },
        }
      );

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery((prevState) => ({
      ...prevState,
      search: e.target.search.value,
    }));
  };

  return (
    <div className="p-4 ticket-list">
      <div className="title-bar d-flex align-items-center justify-content-between">
        <Title title="All Tickets" className="m-0" />
        <Link to="/ticket/create">
          <button className="common-button">Create Ticket</button>
        </Link>
      </div>
      <div className="table-wrapper">
        <div className="filter-section">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="filter-select">
              <select
                name="category"
                id="category"
                onChange={(e) =>
                  setQuery((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {ticketCategories?.map((category) => (
                  <option value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="filter-select">
              <select
                name="status"
                id="status"
                onChange={(e) =>
                  setQuery((prevState) => ({
                    ...prevState,
                    status: e.target.value,
                  }))
                }
              >
                <option value="" disabled selected>
                  Select a status
                </option>
                {ticketStatus?.map((status) => (
                  <option value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="filter-select">
              <select
                name="priority"
                id="priority"
                onChange={(e) =>
                  setQuery((prevState) => ({
                    ...prevState,
                    priority: e.target.value,
                  }))
                }
              >
                <option value="" disabled selected>
                  Select a priority
                </option>
                {ticketPriorities?.map((priority) => (
                  <option value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-search">
            <form
              className=" d-flex align-items-center justify-content-between gap-2"
              action="#"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search.."
              />
              <button type="submit" className="common-button-square">
                <i class="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
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
