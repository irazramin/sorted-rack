import React from "react";
import "./style.scss";
import Comment from "./Comment/Comment";
const Comments = ({ comments = [], setComments }) => {
  return (
    <div className="comments">
      {comments?.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
