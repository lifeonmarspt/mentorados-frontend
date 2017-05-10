import axios from 'axios'
import config from '../config'

export const getCareers = () => {
  return axios.get(`${config.apiBaseURL}/careers`);
}

export const getMentors = () => {
  return axios.get(`${config.apiBaseURL}/mentors`);
}
