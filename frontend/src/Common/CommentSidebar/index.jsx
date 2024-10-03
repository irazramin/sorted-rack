import React from "react";
import "./style.scss";
const CommentSidebar = ({ showCommentSidebar, setShowCommentSidebar }) => {
  return (
    <div className={`comment-sidebar  ${showCommentSidebar ? "show" : ""}`}>
      <button onClick={() => setShowCommentSidebar((prevState) => !prevState)}>
        close
      </button>
    </div>
  );
};

export default CommentSidebar;
