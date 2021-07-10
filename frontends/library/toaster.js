import { toast } from 'react-toastify';

export default function toaster(action,args){
	let options = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};
		
	(action === 'error' ? toast.error(args,options) :  toast.success(args,options))
}

