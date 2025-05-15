import axios from 'axios';

axios.defaults.baseURL = import.meta.env.MODE !== 'production' ? 'http://localhost:8080' : '/';