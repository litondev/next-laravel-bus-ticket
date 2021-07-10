import Head from "next/head";
import Link from "next/link";

import { Component } from "react";

import DefaultLayout from "../layouts/default.js";
import axios from "../library/axios.js";

export default class Index extends Component {    
  onRefresh(){
    axios.get("/me").then(res => {
      console.log('Success');
    }).catch(err => {
      console.log('Terjadi Kesalahan');
    })
  }

  render(){
    return (
    	<>
  	   <Head>
  		  <title>Home</title>
  	   </Head>

      <DefaultLayout {...this.props}> 
      	<div className="container">
    	   	Home
          <button onClick={() => this.onRefresh()}>Refresh Token</button>
      	</div>
      </DefaultLayout>
      </>
    )
  }
}
