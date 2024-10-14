import React from "react";
import user from "../../../assests/images/user-img.png";
import { timeAgo } from "../../../Utility/timeAgo";

const NewComment = ({ comment }) => {
  return (
    <div className="comment">
      <img src={user} alt="" />
      <div className="info">
        <div>
          <h4 className="name">
            {comment?.userId?.fname} {comment?.userId?.lname}{" "}
            {comment?.userId?.role === "superadmin" && (
              <span className="role">Admin</span>
            )}
          </h4>
          <span className="date">
            <i class="bi bi-clock"></i> <b></b> {timeAgo(comment?.createdAt)}
          </span>
        </div>
        <p className="comment-text">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default NewComment;
