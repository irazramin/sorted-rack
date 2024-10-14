import React, { useEffect, useState } from "react";
import "./style.scss"
import ShadowLessCard from "../../Common/ShadowLessCard";
import { Col, Form, Row } from "react-bootstrap";
import { axiosSecure } from "../../api/axios";
import { userHeader } from "../../Utility/userHeader";

const UserDashboard = () => {
  const [info, setInfo] = useState({})
  useEffect(() => {
    fetchTicketDetails();
  }, []);

  const fetchTicketDetails = async () => {
    try {
      const res = await axiosSecure.get(
        `/ticket/get-ticket-count`,
        {
          headers: { Authorization: userHeader() },
        }
      );

      console.log(res);

      if (res) {
        setInfo(res.data.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <div className="dashboard-wrapper">
     <Row className="">
      <Col xl={3} className="mb-4">
      <ShadowLessCard>
      <div class="card">
        <div class="icon">
        <i class="bi bi-ticket"></i>
        </div>
        <div class="text">
            <h3>All Tickets</h3>
            <p>{info?.all}</p>
        </div>
       </div>
      </ShadowLessCard>
      </Col>
      <Col xl={3} className="mb-4">
      <ShadowLessCard>
      <div class="card">
        <div class="icon">
        <i class="bi bi-ticket"></i>
        </div>
        <div class="text">
            <h3>New Tickets</h3>
            <p>{info?.newTickets}</p>
        </div>
       </div>
      </ShadowLessCard>
      </Col>
      <Col xl={3} className="mb-4">
      <ShadowLessCard>
      <div class="card">
        <div class="icon">
        <i class="bi bi-ticket"></i>
        </div>
        <div class="text">
            <h3>Hold Tickets</h3>
            <p>{info?.holdTickets}</p>
        </div>
       </div>
      </ShadowLessCard>
      </Col>
      <Col xl={3} className="mb-4">
      <ShadowLessCard>
      <div class="card">
        <div class="icon">
        <i class="bi bi-ticket"></i>
        </div>
        <div class="text">
            <h3>In progress</h3>
            <p>{info?.inProgress}</p>
        </div>
       </div>
      </ShadowLessCard>
      </Col>
      <Col xl={3} className="mb-4">
      <ShadowLessCard>
      <div class="card">
        <div class="icon">
        <i class="bi bi-ticket"></i>
        </div>
        <div class="text">
            <h3>Done</h3>
            <p>{info?.done}</p>
        </div>
       </div>
      </ShadowLessCard>
      </Col>
    
     </Row>
  </div>;
};

export default UserDashboard;
