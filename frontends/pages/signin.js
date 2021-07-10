import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { Component } from "react";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import toaster from "../library/toaster.js";
import axios from "../library/axios.js";
import TheLoading from "../components/the-loading.js";
import DefaultLayout from "../layouts/default.js";

export async function getServerSideProps(context) {  
  if(getCookies(context,'token')){
    return {
      redirect : {
        destination: '/',
        permanent : false
      }
    }
  }  

  return {
    props : {}
  };
}

export default class Signin extends Component {    
  constructor(props){
    super(props)

    // if(getCookies(null,'token')){
    //   Router.push('/');
    // }

    this.state = {
      fields : {
        email : '',
        password : ''
      },
      errors : {},
      isLoadingPage : false,
      isLoadingSignin : false,
      isInvalid : true,
      form : {
        handleChangeEvent  : () => {},
      }
    }   
  }

  async componentDidMount(){
    let ReactFormInputValidation = await import("react-form-input-validation");  

    let form = new ReactFormInputValidation.default(this);

    form.useRules({
      email : "required|email",
      password : "required|min:8"
    });

    form.onformsubmit = this.onSignin.bind(this);  

    this.setState({
      form : form,
    })

    // setTimeout(() => {
    //   this.setState({
    //     isLoadingPage : false
    //   })
    // },2000);
  }

  onSignin(fields){   
    if(this.state.isLoadingSignin){
      return false;
    }

    this.setState({
      isLoadingSignin : true
    });

    axios.post("/signin",fields)
    .then(res => {
      toaster('success','Berhasil Masuk');

      setCookies(null,'token',res.data.access_token);
    
      Router.push('/')   
    })
    .catch(err => {   
      this.setState({
        isLoadingSignin : false
      });

      if(err.response && err.response.status === 422){
         toaster('error',err.response.data.error);
      }else if(err.response && err.response.status === 500){
         toaster('error',err.response.data.message);
      }else{
         toaster('error','Terjadi Kesalahan');
      }
    })
  }

  render(){
    // if(this.state.isLoadingPage){
    //   return <TheLoading/>
    // }

    return (
      <>
       <Head>
        <title>Signin</title>
       </Head>

        <DefaultLayout {...this.props}>         
          <div className="container">
            <div className="row">          
              <div className="col-md-6 text-center">
                <img src="/assets/img/signin.png" 
                  className="img-fluid" />
              </div>
              <div className="col-md-6">
                <form onSubmit={ this.state.form.handleSubmit }>

                  <div className="d-block mb-2">
                    Email
                  </div>

                  <div className="input-group mb-3">              
                    <input type="email" 
                      className={
                          this.state.errors.email 
                          ? 'is-invalid form-control' 
                          : 'form-control'
                      } 
                      placeholder="Email"
                      name="email"
                      onChange={ this.state.form.handleChangeEvent }
                      value={ this.state.fields.email }/>

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>                                

                    {
                      !this.state.errors.email
                      ?
                      <div className="text-muted d-block w-100">
                        Masukan Email Anda
                      </div>
                      : 
                      <div className="invalid-feedback">
                        { this.state.errors.email }
                      </div>
                    }
                  </div>

                  <div className="d-block mb-2">
                    Password
                  </div>

                  <div className="input-group mb-3">             
                    <input type="password" 
                      className={
                        this.state.errors.password 
                        ? 'is-invalid form-control' 
                        : 'form-control'
                      } 
                      placeholder="Password"
                      name="password"
                      onChange={ this.state.form.handleChangeEvent }
                      value={ this.state.fields.password }/>

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                    
                    {
                      !this.state.errors.password
                      ?
                      <div className="text-muted d-block w-100">
                        Masukan Password Anda
                      </div>
                      : 
                      <div className="invalid-feedback">
                        { this.state.errors.password }
                      </div>
                    }
                  </div>

                  <div className="row">               
                    <div className="col-12 text-right">
                     { this.state.isLoadingSignin && 
                      <button className="btn my__button">
                        <i className="fa fa-circle-notch fa-spin"></i>
                      </button>
                     }

                     { !this.state.isLoadingSignin &&
                      <button className="btn my__button"  type="submit">
                        Sign In
                      </button>
                     }
                    </div>
                  </div>
                </form>    
              </div>
            </div>
          </div>
        </DefaultLayout>
      </>
    )
  }
}
