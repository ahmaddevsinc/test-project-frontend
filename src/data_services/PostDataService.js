import http from './index';
export const addPost = (data) => http.post(`api/posts/`, data);

export const findAllPosts = () => http.get(`api/posts/`);

export const deletePostById = (id) => http.delete(`api/posts/${id}`);

export const editPostById = (id, values) => http.put(`api/posts/${id}`, values);

export const findDraftsById = () => http.get(`api/posts/drafts`);
