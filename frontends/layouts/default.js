import Link from "next/link";
import Router from "next/router";

import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import axios from "../library/axios.js";
import toaster from "../library/toaster.js";

export default class Default extends Component{
	constructor(props){
		super(props);

		this.state = {
			isLoadingLogout  : false,
			showSidebar : false,
			isLogin : getCookies(null,'token') ? true : false
		}
	}

	onLogout(){
		if(this.state.isLoadingLogout){
			return false;
		}

		this.setState({
			isLoadingLogout : true
		})

		axios.post("/logout")
		.then(res => {
			this.setState({
				showSidebar : false
			});

			removeCookies(null,'token');

			Router.push('/signin');			
		})
		.catch(err => {
			this.setState({
				isLoadingLogout : false
			})

		 	if(err.response && err.response.status === 500){
		       	toaster('error',err.response.data.message);
		    }else{
		        toaster('error','Terjadi Kesalahan');
		   	}
		});	
	}

	onSidebar(){
		if(this.state.showSidebar){
			window.$(".menu-sidebar").addClass("animate__fadeOut")
			setTimeout(() => {
				this.setState({
					showSidebar : false
				})
			},500);
		}else{		
			this.setState({
				showSidebar : true
			})		
		}
	}

	render(){	
		let sidebarStyle = {
			zIndex: 2001,
			position : "fixed",
			top : 0,
			right : 0,
			left: 0,
			bottom:0
		}

		let menuSidebarStyle = {
			background : "white"
		}

		let sideMenuSidebarStyle = {
			background:"black",
			opacity : 0.3
		}

		let navBarStyle = {
			boxShadow: "0px 0px 15px -5px gray",
			background: "white",
			borderBottom: "0px",
			paddingTop : "15px",
			paddingBottom : "15px"
		}

		return (
			<>
			    <ToastContainer/>
			    
			  	<nav className="main-header navbar navbar-expand navbar-light"
				  	style={navBarStyle}>
				  	<div className="container-fluid">
					    <ul className="navbar-nav">			  
					      <li className="nav-item d-none d-sm-inline-block">
					        <Link href="/" 
					        	className="nav-link mr-3 ml-3">
					        	<img src="/assets/img/logo.png" 
					        		style={{height : '25px'}}/>
					        </Link>
					      </li>			 
					    </ul>
				
					    <ul className="navbar-nav ml-auto">
					      <li className="nav-item ml-4 mr-2">
					      	<input type="text" className="form-control my__input" placeholder="Search . . ."/>
					      </li>
					      { !this.state.isLogin && 
					      	<li className="nav-item ml-4 mr-2">
					        	<Link href="/signin">
						      		<a className="btn my__button">
					      			Masuk
					      			</a>
					      		</Link>
					      	</li>
					      }

					 	  { !this.state.isLogin && 
						      <li className="nav-item ml-4 mr-2">
						      	<Link href="/signup">
						      		<a className="btn my__button">
						      			Daftar
						      		</a>
						      	</Link>
						      </li>
					  	  }

					  	  { this.state.isLogin && 
					  	  	<li className="nav-item ml-4 mr-2 pt-2">
					  	  		<a className="my__text">
					  	  			<i className="fas fa-shopping-cart"></i>
					  	  		</a>
					  	  	</li>
					  	  }

					  	  { this.state.isLogin && 
					  	  	<li className="nav-item ml-4 mr-2 pt-2">
					  	  		<a className="my__text" 
					  	  			onClick={() => this.onSidebar()}>
					  	  			<i className="fas fa-th fa-1x"></i>
					  	  		</a>
					  	  	</li>
					  	  }
					    </ul>
				    </div>
				</nav>  

				{this.state.showSidebar && 
				  	<>
					  	<div className="row ml-0 mr-0 animate__animated animate__fadeIn menu-sidebar" 
					  		style={ sidebarStyle }>			  	
						  	<div className="d-none d-lg-block col-lg-10 col-12 h-100" 
						  		style={ sideMenuSidebarStyle }></div>
					  		<div className="col-lg-2 col-12 h-100 pl-4 pr-4 pt-3" 
					  			style={ menuSidebarStyle }>
				  				<div className="clearfix">
				  					<div className="float-left">
				  						Menu
				  					</div>
				  					<div className="float-right">
				 						<a className="text-dark" 
				 							href="#"
				 							onClick={() => this.onSidebar()}>
						          			<i className="fas fa-times"></i>
						        		</a>
				  					</div>
				  				</div> 

				  				<ul className="list-group border-0 mt-3">
				  					<li className="list-group-item border-0">
				  						<Link href="/">
				  							<a href="#"
				  								className={ Router.route == '/' ? 'text-dark text-bold' : 'text-dark'}>
				  								<i className="fas fa-home"></i> Home
				  							</a>
				  						</Link>
				  					</li>
				  					<li className="list-group-item border-0">
				  						<Link href="/profil">
				  							<a href="#"
				  								className={ Router.route == '/profil' ? 'text-dark text-bold' : 'text-dark' }>
				  								<i className="fas fa-user"></i> Profil
				  							</a>
				  						</Link>		  				
				  					</li>			  					
				  					<li className="list-group-item border-0">
				  						<a href="#" className="text-dark"
				  							onClick={() => this.onLogout()}>
				  							<i className="fas fa-power-off"></i> Keluar 
				  							{ this.state.isLoadingLogout && <> <i className="fa fa-circle-notch fa-spin"></i> </> }
				  						</a>		  			
				  					</li>
				  				</ul>
				  			</div>
				  	  	</div>
			  	  	</>
			  	}

				<div className="container-fluid pl-2 pr-2 mt-5">
				 	{ this.props.children }
				</div>
			</>
		)
	}
}