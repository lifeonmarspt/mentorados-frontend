import axios from 'axios'
import config from '../config'

const api = axios.create({
  baseURL: config.apiBaseURL
});

export const getCareers = () => {
  return api.get('/careers');
}

export const getMentors = (q) => {
  let url = '/mentors';
  if (q) {
    url += `?q=${encodeURIComponent(q)}`
  }
  return api.get(url);
}

export const postLogin = (fields) => {
  return api.post('/login', {
    auth: fields
  });
}
