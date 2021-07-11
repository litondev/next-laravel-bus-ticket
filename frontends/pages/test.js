import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { Component } from "react";

import DefaultLayout from "../layouts/default.js";
import axios from "../library/axios.js";

export async function getServerSideProps(context) {  
    console.log('hai');
    return {props : {}}
}

export default class Test extends Component {    
  constructor(props){
    super(props);

    this.state = {
      count : 0
    }
  }

  onRefresh(){

    this.setState({
      count : this.state.count+1
    })

    Router.push({
      pathname : "/test",
      query : {
        page : this.state.count
      }
    });
  }

  render(){
    return (
    	<>
  	   <Head>
  		  <title>Test</title>
  	   </Head>

      <DefaultLayout {...this.props}> 
      	<div className="container">
    	   	Test
          <button onClick={() => this.onRefresh()}>Refresh Token</button>
      	</div>
      </DefaultLayout>
      </>
    )
  }
}
