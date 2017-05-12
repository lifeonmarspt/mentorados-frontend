import axios from 'axios'
import { stringify } from 'query-string';

import config from '../config'

const api = axios.create({
  baseURL: config.apiBaseURL
});

export const getCareers = () => {
  return api.get('/careers');
}

export const getMentors = (filters) => {

  let url = '/mentors';

  let serializable = {
    string: filters.string ?
      filters.string : undefined,
    gender: filters.genders ?
      (filters.genders.find((gender) => gender.checked && gender.id !== 'A') || {}).id : undefined,
    career_ids: filters.careers ?
      filters.careers.filter((career) => career.checked).map((career) => career.id) : undefined
  };

  let qs = stringify(serializable, { arrayFormat: 'bracket' });

  if (qs) {
    url += `?${qs}`
  }

  return api.get(url);

}

export const postLogin = (fields) => {
  return api.post('/login', {
    auth: fields
  });
}
