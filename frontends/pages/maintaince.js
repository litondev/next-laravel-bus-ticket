import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { Component } from "react";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import axios from "../library/axios.js";

export async function getServerSideProps(context) {  
  if(!getCookies(context,'maintaince')){
    return {
      redirect : {
        destination: '/',
        permanent : false
      }
    }
  }  

  return {props : {}};
}

export default class Maintaince extends Component {    
  checkMaintaince(){
    axios.get("/check").then(res => {
      removeCookies(null,'maintaince');

      Router.push('/');
    })
    .catch(err => {
      console.log('Not Yet');
    });
  }

  render(){
    return (
    	<>
  	   <Head>
  		  <title>Maintaince</title>
  	   </Head>

      	<div className="container">
    	   	Maintaince
          <button onClick={() => this.checkMaintaince()}>Maintaince</button>
      	</div>      
      </>
    )
  }
}
