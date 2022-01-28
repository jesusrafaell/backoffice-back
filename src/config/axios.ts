import axios from 'axios';

// crea y exporta una instacioa de axios
export const logs = axios.create({
	baseURL: 'http://api.unsplash.com',
});
