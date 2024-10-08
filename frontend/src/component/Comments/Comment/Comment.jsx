import React, { useEffect } from "react";
import user from "../../../assests/images/user-img.png";
import { formatCreatedAt } from "../../../Utility/dateFormatter";
import { getUserDetails } from "../../../service";
const Comment = ({ comment }) => {
  const { role, email } = getUserDetails();

  useEffect(() => {
    console.log(email, getUserDetails());
  }, [email]);
  return (
    <div className="comment-wrapper">
      <div className="comment">
        <div className="user-img">
          <img src={user} alt="" />
        </div>
        <div className="info">
          <div className="name-date">
            <h4 className="name">{role === "useradmin" ? "Admin" : email}</h4>
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
