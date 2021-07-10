import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import TheLoading from "../components/the-loading.js";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import 'react-toastify/dist/ReactToastify.css';

export default class MyApp extends App {
	constructor(props){
		super(props);

		this.state = {
			loading : true
		}
	}

	componentDidMount(){
		if(getCookies(null,'maintaince') && Router.route != "/maintaince"){
			Router.push('/maintaince').then(() => {
				this.setState({
					loading : false
				})
			})			
		}else{
			setTimeout(() => {
				this.setState({
					loading : false
				})
			},2000);
		}
	}

	render(){
		return (
			<>
				<Head>

		    		<link rel="stylesheet" href="/assets/plugins/fontawesome-free/css/all.min.css"/>
		  
		    		<link rel="stylesheet" href="/assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"/>

		    		<link rel="stylesheet" href="/assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css"/>

		    		<link rel="stylesheet" href="/assets/plugins/jqvmap/jqvmap.min.css"/>

		    		<link rel="stylesheet" href="/assets/css/adminlte.min.css"/>

		    		<link rel="stylesheet" href="/assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"/>

		    		<link rel="stylesheet" href="/assets/plugins/daterangepicker/daterangepicker.css"/>

		    		<link rel="stylesheet" href="/assets/plugins/summernote/summernote-bs4.min.css"/>

		    		<link rel="stylesheet" href="/assets/css/animate.min.css"/>
		    		
				  	<link rel="stylesheet" href="/assets/css/all.css"/>

				  	<script src="/assets/plugins/jquery/jquery.min.js" defer></script>

				  	<script src="/assets/plugins/jquery-ui/jquery-ui.min.js" defer></script>
				   		 
				  	<script src="/assets/plugins/bootstrap/js/bootstrap.bundle.min.js" defer></script>

				  	<script src="/assets/plugins/chart.js/Chart.min.js" defer></script>
				  
				  	<script src="/assets/plugins/jquery-knob/jquery.knob.min.js" defer></script>

				  	<script src="/assets/plugins/moment/moment.min.js" defer></script>

				  	<script src="/assets/plugins/daterangepicker/daterangepicker.js" defer></script>

				  	<script src="/assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js" defer></script>

				  	<script src="/assets/plugins/summernote/summernote-bs4.min.js" defer></script>
				  
				  	<script src="/assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js" defer></script>

				  	<script src="/assets/js/adminlte.js" defer></script>
					
					<script src="/assets/js/all.js" defer></script>  	
					
				</Head>

				{ this.state.loading  && <TheLoading/> }

				{ !this.state.loading && <>		
					<this.props.Component {...this.props.pageProps} /> 						
				</>}
			</>
		)
	}
}