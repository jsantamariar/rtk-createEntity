import React, { memo } from "react";

const Comments = ({ id, body, onDelete, onPatch }) => {
  return (
    <div>
      <ul>
        <li>
          {id} {body}
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onPatch(id, { body: "new text" })}>
            Update
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(Comments);
