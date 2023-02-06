import React from "react";

const Comments = ({ comment, onDelete }) => {
  return (
    <div>
      <ul>
        <li>
          {comment.id} {comment.body}
          <button onClick={() => onDelete(comment.id)}>Delete</button>
          <button>Update</button>
        </li>
      </ul>
    </div>
  );
};

export default Comments;
