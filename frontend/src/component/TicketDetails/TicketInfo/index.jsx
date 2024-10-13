import React, { useEffect, useState } from "react";
import ShadowLessCard from "../../../Common/ShadowLessCard";
import { userHeader } from "../../../Utility/userHeader";
import { axiosSecure } from "../../../api/axios";
import { formatCreatedAt } from "../../../Utility/dateFormatter";
import Select from "react-select";
import { getUserDetails } from "../../../service";
import { toast } from "react-toastify";

const TicketInfo = ({ ticket, setRefresh }) => {
  const { role } = getUserDetails();
  const [adminUsers, setAdminUser] = useState([]);
  const [showAssignSearch, setAssignSearch] = useState(false);

  useEffect(() => {
    fetchingAdminUsers();
  }, []);
  const fetchingAdminUsers = async () => {
    try {
      const response = await axiosSecure.get(`/user/admin-user`, {
        headers: {
          Authorization: userHeader(),
        },
      });
      setAdminUser(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignTicket = async (data) => {
    try {
      const res = await axiosSecure.put(
        `/admin/ticket/${ticket?._id}/assign`,
        { assignId: data.value },
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );

      if (res) {
        setAssignSearch(false);
        toast.success(`This ticket is assigned with ${data.label}`);
        setRefresh((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnassignTicket = async () => {
    try {
      const res = await axiosSecure.put(
        `/admin/ticket/${ticket?._id}/assign`,
        { assignId: null },
        {
          headers: {
            Authorization: userHeader(),
          },
        }
      );

      if (res) {
        setAssignSearch(false);
        toast.success(`Ticket unassigned`);
        setRefresh((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ShadowLessCard>
      <div className="ticket-details">
        <h4 className="title">Ticket Information</h4>
        <ul className="details">
          <li className="detail">
            <span className="type">ID</span>
            <span>:</span>
            <span className="value">{ticket?.uniqueId}</span>
          </li>
          <li className="detail">
            <span className="type">Category</span>
            <span>:</span>
            <span className="value">{ticket?.ticketCategory}</span>
          </li>
          <li className="detail">
            <span className="type">Priority</span>
            <span>:</span>
            <span className="value">{ticket?.ticketPriority}</span>
          </li>
          <li className="detail">
            <span className="type">Status</span>
            <span>:</span>
            <span className="value">{ticket?.ticketStatus}</span>
          </li>
          <li className="detail">
            <span className="type">Created</span>
            <span>:</span>
            <span className="value">{formatCreatedAt(ticket?.createdAt)}</span>
          </li>
          <li className="detail">
            <span className="type">Assigned to: </span>
            <span>:</span>
            <span className="value">
              {ticket?.assignTo?.fname
                ? ticket?.assignTo?.fname + ticket?.assignTo?.fname
                : " N/A"}
            </span>
          </li>
        </ul>
        {role === "superadmin" && ticket?.ticketStatus !== "Resolve" ? (
          <div className="assign-wrapper">
            {showAssignSearch ? (
              <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={colourOptions[0]}
                isSearchable={true}
                onChange={(e) => handleAssignTicket(e)}
                name="color"
                options={adminUsers}
              />
            ) : ticket?.assignTo ? (
              <button
                onClick={() => handleUnassignTicket()}
                className="assign-to"
              >
                Unassign
              </button>
            ) : (
              <button
                onClick={() => setAssignSearch((prevState) => !prevState)}
                className="assign-to"
              >
                Assign to
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </ShadowLessCard>
  );
};

export default TicketInfo;
