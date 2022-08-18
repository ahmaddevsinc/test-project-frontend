import http from './index';

export const addComment = (values) => http.post(`api/comments/`, values);

export const findCommentsById = (postId) => http.get(`api/comments/${postId}`);

export const deleteCommentById = (id) => http.delete(`api/comments/${id}`);

export const editCommentById = (id, values) =>
  http.put(`api/comments/${id}`, values);
