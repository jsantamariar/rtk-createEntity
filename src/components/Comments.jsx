import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../features/comments/Comment";
import {
  fetchComments,
  commentsSelectors,
  removeOneComment,
  patchComment,
} from "../store/slices/comments/commentsSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(commentsSelectors.selectAll);

  const onDelete = useCallback(id => {
    return dispatch(removeOneComment(id));
  }, []);

  const onPatch = useCallback((id, newObj) => {
    return dispatch(patchComment({ id, newObj }));
  }, []);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  if (allComments.length < 1) return <div>There is no more data...</div>;
  return allComments.map(({ id, body }) => (
    <div key={id}>
      <Comment id={id} body={body} onDelete={onDelete} onPatch={onPatch} />
    </div>
  ));
};

export default Comments;
