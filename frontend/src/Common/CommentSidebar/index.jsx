import React from "react";
import "./style.scss";
import Title from "../../component/Shared/Title";
const CommentSidebar = ({ showCommentSidebar, setShowCommentSidebar }) => {
  return (
    <div className={`comment-sidebar  ${showCommentSidebar ? "show" : ""}`}>
      <button
        className="close-btn"
        onClick={() => setShowCommentSidebar(false)}
      >
        <i class="bi bi-x"></i>
      </button>
      <div className="top-section">
        <div className="info-part">
          <Title title="This is a title" className="top" showDivider={false} />
          <span className="created-by">Created by who on date</span>
        </div>
        <div className="action-part"></div>
      </div>
    </div>
  );
};

export default CommentSidebar;
