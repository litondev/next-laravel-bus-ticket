import axios from "axios";
import Router from "next/router";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(config => { 	
  	config.headers['Authorization'] = getCookies(null,'token') ? 'Bearer '+getCookies(null,'token') : null
  	return config;
});

axios.interceptors.response.use(
	res => res,
	err => {		
		if(!err.response){
			throw err;
		}

		if(err.response.status === 503 && !getCookies(null,"maintaince")){		
			setCookies(null,'maintaince',true);
	 		Router.push('/maintaince');
			return false;
		}

		if(err.response.status !== 401){
			throw err;
		}
	
		if(!["Token is expired","Token telah kadaluwarsa"].includes(err.response.data.message)){
			removeCookies(null,'token');

	 		Router.push('/signin');

	 		throw err;
		}

		return axios.post("/refresh")
		.then(res => {	
			setCookies(null,'token',res.data.access_token);
			
			return axios(err.config)
		});		
	}
)

export default axios;