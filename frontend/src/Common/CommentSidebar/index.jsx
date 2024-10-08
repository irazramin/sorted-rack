import React, { useEffect, useState } from "react";
import "./style.scss";
import Title from "../../component/Shared/Title";
import parser from "html-react-parser";
import { userHeader } from "../../Utility/userHeader";
import { axiosSecure } from "../../api/axios";
import { formatCreatedAt } from "../../Utility/dateFormatter";
import "react-quill/dist/quill.snow.css";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextAreaField from "../../component/Shared/Form/TextArea";
import Button from "../../component/Shared/Button";
import Comments from "../../component/Comments/Comments";

const CommentSidebar = ({
  showCommentSidebar,
  setShowCommentSidebar,
  selectedTicket,
  comments,
  setComments,
  ticket,
  setTicket,
}) => {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const initialValues = {
    comment: "",
  };
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: initialValues,
  });

  const commentValue = watch("comment");

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
        setShowCommentSection(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`comment-sidebar  ${showCommentSidebar ? "show" : ""}`}
    >
      <button
        className="close-btn"
        onClick={() => setShowCommentSidebar(false)}
      >
        <i class="bi bi-x"></i>
      </button>
      <div className="top-section">
        <div className="info-part">
          <Title
            title={ticket?.ticketName}
            className="top"
            showDivider={false}
          />
          <span className="created-by">
            Created by {ticket?.userId?.fname} {ticket?.userId?.lname} on{" "}
            {formatCreatedAt(ticket?.createdAt)}
          </span>
        </div>
        <div className="action-part"></div>
      </div>

      <div className="body-section">
        {parser(`<div>${ticket?.ticketDetails}</div>`)}

        <hr className="my-3" />

        <div className="comment-box-wrapper">
          <label htmlFor="comment" className="comment-label">
            Comment
          </label>

          {!showCommentSection ? (
            <div
              className="my-3 comment-box-readonly"
              onClick={() => setShowCommentSection((prevState) => !prevState)}
            >
              Write a comment
            </div>
          ) : (
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
                      onClick={() => setShowCommentSection(false)}
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          )}

          <hr className="my-3" />

          <Comments comments={comments} setComments={setComments} />
        </div>
      </div>
    </div>
  );
};

export default CommentSidebar;
