import React, { useEffect, useState } from "react";
import "./style.scss";
import Title from "../../component/Shared/Title";
import { userHeader } from "../../Utility/userHeader";
import { axiosSecure } from "../../api/axios";
import { formatCreatedAt } from "../../Utility/dateFormatter";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import CommentSidebar from "../../Common/CommentSidebar";
const RequestedTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState({});

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

  return (
    <div className="p-4">
      <div className="mb-4 p-3 title-bar d-flex align-content-center justify-content-between">
        <Title title="All Request Tickets" className="m-0" />
      </div>
      <div className="table-responsive">
        <table className="table table-responsive">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="20%">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col" width="20%">
                #TicketID
              </th>
              <th scope="col" width="20%">
                Category
              </th>
              <th scope="col" width="10%">
                Priority
              </th>
              <th scope="col" width="20%">
                Status
              </th>
              <th scope="col" width="20%">
                Created
              </th>
              <th scope="col" className="text-center" width="20%">
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
        </table>
      </div>
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
