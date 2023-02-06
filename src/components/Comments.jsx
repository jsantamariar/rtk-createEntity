import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../features/comments/Comment";
import {
  fetchComments,
  commentsSelectors,
  deleteComments,
  removeOneComment,
} from "../store/slices/comments/commentsSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(commentsSelectors.selectAll);

  const onDelete = useCallback(id => {
    return dispatch(removeOneComment(id));
  }, []);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  if (allComments.length < 1) return <div>There is no more data...</div>;
  return allComments.map(comment => (
    <div key={comment.id}>
      <Comment comment={comment} onDelete={onDelete} />
    </div>
  ));
};

export default Comments;
