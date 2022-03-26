import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});
 
export const request = ({...options}) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('aconToken')}`;
  return client(options);
}
