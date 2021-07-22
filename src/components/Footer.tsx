import Link from 'next/link'
import {API, Auth, Hub, Storage} from "aws-amplify";
import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {Router, withRouter} from 'next/router';
import ApiManager from '../services/ApiManager';

class Drawer extends Component {

  render() {
    return (
      <>
        <div className="footer">
          <div>
            <p className="footer-title">Created For Patients
              By Dentists</p>
            <p className="footer-text">Find Your Dentist</p>
          </div>
          <div className="footer-menu">
            <ul><p className="form-profile-label">For Patients</p>
              <li><a href="#">Whitening</a></li>
              <li><a href="#">Veneers</a></li>
              <li><a href="#">Braces</a></li>
              <li><a href="#">Map Search</a></li>
            </ul>
            <ul><p className="form-profile-label">For Dentists</p>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Create a Profile</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
            <ul><p className="form-profile-label">Information </p>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">About FYD</a></li>
              <li><a href="#">Contact Information</a></li>
              <li><a href="#">Policies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom bg-green">
          <div className="social-icons">
            <a href="#">
              <img src="../images/facebook.svg" alt="facebook" />
            </a>
          </div>
          <div> ©2021 Find Your Dentist</div>
        </div>
      </>
    );
  }
};

// @ts-ignore
export default withRouter(Drawer);