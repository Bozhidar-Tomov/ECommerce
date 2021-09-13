import React from "react";

import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { ImGoogle } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";

import "./styles.css";

function Footer() {
  return (
    <footer className='text-center text-lg-start text-muted'>
      <section
        className='
          d-flex
          justify-content-center justify-content-lg-between
          p-3
          border-bottom border-primary
        '>
        <div className='me-5 d-none d-lg-block text-primary fs-5'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div className='fs-5'>
          <a href='#home' className='me-4 text-reset'>
            <ImFacebook />
          </a>
          <a href='#home' className='me-4 text-reset'>
            <ImTwitter />
          </a>
          <a href='#home' className='me-4 text-reset'>
            <ImGoogle />
          </a>
          <a href='#home' className='me-4 text-reset'>
            <FiInstagram />
          </a>
          <a href='#home' className='me-4 text-reset'>
            <FaLinkedin />
          </a>
          <a href='#home' className='me-4 text-reset'>
            <ImGithub />
          </a>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-3'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> New York, NY 10012, US
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i>
                info@example.com
              </p>
              <p>
                <i className='fas fa-phone me-3'></i> + 01 234 567 88
              </p>
              <p>
                <i className='fas fa-print me-3'></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='copyright text-center p-3'>
        © 2021 Copyright:
        <span className='fw-bold'> Bozhidar Tomov</span>
      </div>
    </footer>
  );
}

export default Footer;
