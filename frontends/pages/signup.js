import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { Component } from "react";
import { getCookies,setCookies,removeCookies } from 'cookies-next';

import DefaultLayout from "../layouts/default.js";
import toaster from "../library/toaster.js";
import axios from "../library/axios.js";

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

export default class Signup extends Component {    
  constructor(props){
    super(props)

    // if(getCookies(null,'token')){
    //   Router.push('/');
    // }

    this.state = {
      fields : {
        username : '',
        email : '',
        phone : '',
        password : ''
      },
      errors : {},
      isLoadingPage : false,
      isLoadingSignup : false,
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
      username : 'required',
      phone : 'required',
      email : "required|email",
      password : "required|min:8"
    });

    form.onformsubmit = this.onSignup.bind(this);  

    this.setState({
      form : form
    })
    
    // setTimeout(() => {
    //   this.setState({
    //     isLoadingPage : false
    //   })
    // },2000);
  }

  onSignup(fields){   
    if(this.state.isLoadingSignup){
      return false;
    }

    this.setState({
      isLoadingSignup : true
    });

    axios.post("/signup",fields)
    .then(res => {
      toaster('success','Berhasil Daftar');
    
      Router.push('/signin')   
    })
    .catch(err => {   
      this.setState({
        isLoadingSignup : false
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
        <title>Signup</title>
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
                    Username
                  </div>

                  <div className="input-group mb-3">
                    <input type="text"
                      className={
                        this.state.errors.username
                        ? 'is-invalid form-control'
                        : 'form-control'
                      }
                      placeholder="Username"
                      name="username"
                      onChange={ this.state.form.handleChangeEvent }
                      value={ this.state.fields.username } />

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>                                

                    {
                      !this.state.errors.username
                      ?
                      <div className="text-muted d-block w-100">
                        Masukan Username Anda
                      </div>
                      : 
                      <div className="invalid-feedback">
                        { this.state.errors.username }
                      </div>
                    }
                  </div>

                  <div className="d-block mb-2">
                    Phone
                  </div>

                  <div className="input-group mb-3">
                    <input type="text"
                      className={
                        this.state.errors.phone
                        ? 'is-invalid form-control'
                        : 'form-control'
                      }
                      placeholder="Phone"
                      name="phone"
                      onChange={ this.state.form.handleChangeEvent }
                      value={ this.state.fields.phone } />

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-phone"></span>
                      </div>
                    </div>                                

                    {
                      !this.state.errors.phone
                      ?
                      <div className="text-muted d-block w-100">
                        Masukan Phone Anda
                      </div>
                      : 
                      <div className="invalid-feedback">
                        { this.state.errors.phone }
                      </div>
                    }
                  </div>

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
                     { this.state.isLoadingSignup && 
                      <button className="btn my__button">
                        <i className="fa fa-circle-notch fa-spin"></i>
                      </button>
                     }

                     { !this.state.isLoadingSignup &&
                      <button className="btn my__button"  type="submit">
                        Sign up
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
