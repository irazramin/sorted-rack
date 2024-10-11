import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Form, Row } from "react-bootstrap";
import ShadowLessCard from "../../../Common/ShadowLessCard";
import user from "../../../assests/images/user-img.png";
import { userHeader } from "../../../Utility/userHeader";
import { axiosSecure } from "../../../api/axios";
import { useForm } from "react-hook-form";
import Button from "../../../component/Shared/Button";
import TextAreaField from "../../../component/Shared/Form/TextArea";
import { useParams } from "react-router-dom";
import { formatCreatedAt } from "../../../Utility/dateFormatter";
import TicketInfo from "../../../component/TicketDetails/TicketInfo";
import ProductInfo from "../../../component/TicketDetails/ProductInfo";

const ViewTicket = () => {
  const { id } = useParams();
  const [expandSection, setExpandSection] = useState(false);
  const [comments, setComments] = useState([]);
  const [ticket, setTicket] = useState(null);
  const initialValues = {
    comment: "",
  };
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: initialValues,
  });

  const commentValue = watch("comment");

  const fetchingSingleTicket = async () => {
    try {
      const response = await axiosSecure.get(`/ticket/${id}`, {
        headers: {
          Authorization: userHeader(),
        },
      });
      setTicket(response?.data?.data);

      reset(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingSingleTicket();
  }, []);

  const onSubmit = async (value) => {
    try {
      const data = {
        ticketId: ticket?._id,
        comment: value.comment,
      };

      const res = await axiosSecure.post(`/comment`, data, {
        headers: {
          Authorization: userHeader(),
        },
      });

      if (res) {
        setComments((prevState) => {
          return [
            ...prevState,
            {
              comment: value.comment,
              userId: ticket?.userId,
              ticketId: ticket?._id,
            },
          ];
        });

        reset({ comment: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="view-ticket">
      <Row>
        <Col xl={3}>
          <Row className="gap-4">
            <Col xl={12}>
              <ShadowLessCard>
                <div className="user-info">
                  <img className="user-img" src={user} alt="" />
                  <div className="info">
                    <h4 className="user-name">
                      {ticket?.userId?.fname} {ticket?.userId?.lname}
                    </h4>
                    <p className="user-email">{ticket?.userId?.email}</p>
                  </div>
                </div>
              </ShadowLessCard>
            </Col>
            <Col xl={12}>
              <TicketInfo ticket={ticket} />
            </Col>
            <Col xl={12}>
              <ProductInfo ticket={ticket} />
            </Col>
          </Row>
        </Col>
        <Col xl={9}>
          <Row className="gap-4">
            <Col xl={12}>
              <ShadowLessCard>
                <div className="ticket-info">
                  <h4 className="ticket-title">{ticket?.ticketName}</h4>
                  <span className="date">
                    <i class="bi bi-clock"></i> <b>Created date</b> 1 day ago
                  </span>

                  <div className="ticket-description">
                    {ticket?.ticketDetails}
                  </div>
                </div>
              </ShadowLessCard>
            </Col>
            <Col xl={12}>
              <ShadowLessCard>
                <div
                  className={`comment-section ${expandSection ? "expand" : ""}`}
                >
                  <div className="top-bar">
                    <h4>Reply on ticket</h4>
                    <button
                      onClick={() =>
                        setExpandSection((prevState) => !prevState)
                      }
                    >
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    <Row>
                      <Col xl={12}>
                        <TextAreaField
                          label=""
                          control={control}
                          name="comment"
                          placeholder="Write a comment"
                          // error={errors.comment}
                          cols={10}
                          rows={6}
                        />
                      </Col>
                      <Col xl={12}>
                        <div className="d-flex align-content-center gap-3 justify-content-end">
                          <Button
                            title="Add Comment"
                            variant="fill"
                            disabled={!commentValue?.trim()}
                          />
                          <Button
                            title="Cancel"
                            variant="border"
                            onClick={() => setExpandSection(false)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </ShadowLessCard>
            </Col>
            <Col xl={12}>
              <ShadowLessCard>
                <div className="all-comments">
                  <div className="comments-header">
                    <h4>Replies</h4>
                  </div>

                  <div className="comment-wrapper">
                    <div className="comment">
                      <img src={user} alt="" />
                      <div className="info">
                        <div className="name">
                          <h4>
                            {ticket?.userId?.fname} {ticket?.userId?.lname}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ShadowLessCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ViewTicket;
