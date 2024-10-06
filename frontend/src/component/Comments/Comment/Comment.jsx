import React from "react";
import user from "../../../assests/images/user-img.png";
import { formatCreatedAt } from "../../../Utility/dateFormatter";
const Comment = ({ comment }) => {
  return (
    <div className="comment-wrapper">
      <div className="comment">
        <div className="user-img">
          <img src={user} alt="" />
        </div>
        <div className="info">
          <div className="name-date">
            <h4 className="name">
              {comment?.userId?.fname} {comment?.userId?.lname}
            </h4>
            <span>{formatCreatedAt(comment?.createdAt ?? new Date())}</span>
          </div>
          <p className="comment-text">{comment?.comment}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Comment;
