import Head from "next/head";
import Link from "next/link";

import { Component } from "react";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import DefaultLayout from "../layouts/default.js";
import axiosServer from "../library/axiosServer.js";

export async function getServerSideProps(context) {  
  if(!getCookies(context,'token')){
    return {
      redirect : {
        destination: '/signin',
        permanent : false
      }
    }
  }  

  try{          
    let { data } = await axiosServer(context).get("/me");
    console.log(data);  
  }catch(err){
   if(err.response && err.response.status === 500){
    console.log(err.response.data.message);
   }else if(err.response && err.response.status === 401){
    return {
      redirect : {
        destination: '/signin',
        permanent : false
      }
    }
   }else if(err.response && err.response.status === 503){
    return {
      redirect : {
        destination : '/maintaince',
        permanent : false
      }
    }
   }else{
    console.log('Terjadi Kesalahan');
   }  
  }

  return {
    props : {}
  };
}

export default class Profil extends Component {    
  render(){
    return (
    	<>
  	   <Head>
  		  <title>Profil</title>
  	   </Head>

      <DefaultLayout {...this.props}> 
      	<div className="container">
    	   	Profil
      	</div>
      </DefaultLayout>
      </>
    )
  }
}
