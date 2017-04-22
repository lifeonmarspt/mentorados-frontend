import axios from 'axios'
import config from '../config'

export const list = () => {
  return axios.get(`${config.apiBaseURL}/mentors`);
}
