import http from './index';

export const createUser = (values) => http.post(`api/users/signup`, values);

export const signInUser = (values) => http.post(`api/users/signin`, values);
