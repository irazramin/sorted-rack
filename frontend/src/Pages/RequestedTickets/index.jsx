import React, { useEffect, useState } from "react";
import "./style.scss";
import Title from "../../component/Shared/Title";
import { userHeader } from "../../Utility/userHeader";
import { axiosSecure } from "../../api/axios";
import { formatCreatedAt } from "../../Utility/dateFormatter";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ticketStatus } from "../Tickets/utils/ticketStatus";
import { toast } from "react-toastify";
import CustomModal from "../../Common/Modal";
import TableHeader from "../../component/Shared/Table/TableHeader";
import { tableHeader } from "./utils/tableHeaders";
import FilterSection from "../../component/Shared/FilterBar";
import CommonCard from "../../Common/CommonCard";
const RequestedTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});
  const [status, setStatus] = useState({});
  const [show, setShow] = useState(false);
  const [layoutSetting, setLayoutSetting] = useState("table");
  const navigate = useNavigate();

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
        <Title title="Requested Tickets" className="m-0" />
        {/* <Link to="/ticket/create">
          <button className="common-button">Create Ticket</button>
        </Link> */}
      </div>
      <div className="table-wrapper">
        <FilterSection
          handleSearchSubmit={handleSearchSubmit}
          setQuery={setQuery}
          layoutSetting={layoutSetting}
          setLayoutSetting={setLayoutSetting}
        />
        {layoutSetting === "table" ? (
          <table className="table mt-2">
            <TableHeader headers={tableHeader} />
            <tbody>
              {tickets?.length > 0 &&
                tickets?.map((ticket) => {
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
                            // handleCommentSectionShow(ticket?._id);
                            navigate(`/ticket/${ticket?._id}`);
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
                          navigate(`/ticket/${ticket?._id}`);
                          // handleCommentSectionShow(ticket?._id);
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
      {/* <div
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
      </div> */}
    </div>
  );
};

export default RequestedTickets;
