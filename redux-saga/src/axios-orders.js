import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-80cc4.firebaseio.com/'
});

export default instance;
