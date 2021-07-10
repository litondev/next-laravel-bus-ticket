import axios from "axios";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

export default function axiosServer(context){
	var instance = axios.create({
    	baseURL : process.env.NEXT_PUBLIC_API_URL,
    	headers : {
      		'Authorization' : getCookies(context,'token') ? 'Bearer '+getCookies(context,'token') : null
    	}
  	})

	instance.interceptors.response.use(
		res => res,
		err => {		
			if(!err.response){
				throw err;
			}

			if(err.response.status === 503 && !getCookies(context,'maintaince')){	 	
				setCookies(context,'maintaince',true);			
				throw err;
			}

			if(err.response.status !== 401){
				throw err;
			}
		
			if(!["Token is expired","Token telah kadaluwarsa"].includes(err.response.data.message)){
		 		removeCookies(context,'token')
		 		throw err;
			}

			return instance.post("/refresh")
			.then(res => {	
				setCookies(context,'token',res.data.access_token);

				err.config.headers['Authorization'] = 'Bearer '+res.data.access_token;
				return instance(err.config)
			});		
		}
	)


	return instance;
}