import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./ticketList.scss";
import { axiosSecure } from "../../../api/axios";
import useAxios from "../../../Hooks/useAxios";
import { userHeader } from "../../../Utility/userHeader";
import CustomModal from "../../../Common/Modal";
import { toast } from "react-toastify";
import CommentSidebar from "../../../Common/CommentSidebar";
import { formatCreatedAt } from "../../../Utility/dateFormatter";
import Title from "../../../component/Shared/Title";
import { ticketCategories } from "../utils/ticketCategories";
import { ticketStatus } from "../utils/ticketStatus";
import { ticketPriorities } from "../utils/ticketPriorities";
import CommonCard from "../../../Common/CommonCard";

const TicketList = () => {
  // const [error, loading, axiosFetch] = useAxios();
  const [show, setShow] = useState(false);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();
  const [layoutSetting, setLayoutSetting] = useState("table");
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
        `/ticket?category=${query.category}&priority=${query?.priority}&status=${query.status}&search=${query.search}`,
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
            <div className="layout-setting">
              <button
                className={`${layoutSetting === "table" ? "active" : ""}`}
                onClick={() => setLayoutSetting("table")}
              >
                <i class="bi bi-list-check"></i>
              </button>
              <button
                className={`${layoutSetting === "card" ? "active" : ""}`}
                onClick={() => setLayoutSetting("card")}
              >
                <i class="bi bi-grid-3x3-gap"></i>
              </button>
            </div>
          </div>
        </div>
        {layoutSetting === "table" ? (
          <div className="user-table">
            <table className="table mt-3 table-responsive">
              <thead>
                <tr className="bg-light">
                  <th scope="col">TicketId</th>
                  <th scope="col">Category</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Status</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Created</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tickets) &&
                  tickets?.map((ticket) => {
                    return (
                      <tr key={ticket?._id}>
                        <td>
                          <span className="ticket-id">
                            {ticket?._id.slice(0, 5)}
                          </span>
                        </td>
                        <td>{ticket?.ticketCategory}</td>
                        <td>{ticket?.userId?.branch}</td>
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
                        <td
                          className="d-flex align-items-center justify-content-center gap-2"
                          style={{ border: "none" }}
                        >
                          <span>
                            <i class="bi bi-chat-left-text"></i>
                          </span>
                          {ticket?.commentCount}
                        </td>
                        <td>{formatCreatedAt(ticket?.createdAt)}</td>
                        <td className="action-wrapper">
                          {ticket?.ticketStatus === "New ticket" && (
                            <>
                              <button
                                className="edit table-action"
                                onClick={() => {
                                  if (ticket?.ticketStatus !== "New ticket") {
                                    toast.error("Admin already working on");
                                  } else {
                                    navigate(`/ticket/edit/${ticket?._id}`);
                                  }
                                }}
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button
                                className="table-action delete"
                                onClick={() => {
                                  if (ticket?.ticketStatus !== "New ticket") {
                                    toast.error("Admin already working on");
                                  } else {
                                    handleShow(ticket?._id);
                                  }
                                }}
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </>
                          )}
                          <button
                            className="table-action details"
                            onClick={() => {
                              // handleCommentSectionShow(ticket?._id);
                              navigate(`/ticket/${ticket?._id}`);
                            }}
                          >
                            <i class="bi bi-eye-fill"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="data-card">
            {Array.isArray(tickets) &&
              tickets?.map((ticket) => {
                return (
                  <CommonCard>
                    <div className="card-info">
                      <span className="category">{ticket?.ticketCategory}</span>
                      <h4 className="title">{ticket?.ticketName}</h4>
                      <p className="description">
                        {ticket?.ticketDetails?.slice(0, 80)}
                      </p>
                    </div>
                    {/* <hr className="divider" /> */}
                    <div className="middle-section">
                      <span
                        className={`card-chip ${ticket?.ticketStatus
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`}
                      >
                        {ticket?.ticketStatus}
                      </span>
                      <span
                        className={`card-chip ${ticket?.ticketPriority
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`}
                      >
                        {ticket?.ticketPriority}
                      </span>
                      <span className={`card-chip comment`}>
                        <i class="bi bi-chat-left-text"></i>{" "}
                        {ticket?.ticketComment}
                      </span>
                    </div>
                    {ticket?.ticketStatus === "New ticket" && (
                      <button
                        onClick={() => {
                          if (ticket?.ticketStatus !== "New ticket") {
                            toast.error("Admin already working on");
                          } else {
                            handleShow(ticket?._id);
                          }
                        }}
                        className="delete-button"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    )}

                    <div className="action">
                      {/* {ticket?.ticketStatus === "New ticket" && ( */}
                      <button
                        disabled={ticket?.ticketStatus !== "New ticket"}
                        onClick={() => {
                          if (ticket?.ticketStatus !== "New ticket") {
                            toast.error("Admin already working on");
                          } else {
                            navigate(`/ticket/edit/${ticket?._id}`);
                          }
                        }}
                      >
                        edit
                      </button>
                      {/* )} */}
                      <button
                        onClick={() => {
                          handleCommentSectionShow(ticket?._id);
                        }}
                      >
                        view
                      </button>
                    </div>
                  </CommonCard>
                );
              })}
          </div>
        )}
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
