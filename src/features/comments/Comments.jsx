import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  commentsSelectors,
} from "../../store/slices/comments/commentsSlice";

const Comments = () => {
  const dispatch = useDispatch();

  const total = useSelector(commentsSelectors.selectTotal);
  const allComments = useSelector(commentsSelectors.selectAll);
  const commentWithId5 = useSelector(state =>
    commentsSelectors.selectById(state, 5)
  );

  console.log({ total, allComments, commentWithId5 });

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <div>
      <ul>
        {allComments.map(({ id, name }) => (
          <li key={id}>
            {id} {"  "}
            {name}
            <button>Delete</button>
            <button>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
