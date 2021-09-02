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
    <footer class='text-center text-lg-start text-muted'>
      <section
        class='
          d-flex
          justify-content-center justify-content-lg-between
          p-3
          border-bottom border-primary
        '>
        <div class='me-5 d-none d-lg-block text-primary fs-5'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div class='fs-5'>
          <a href='#home' class='me-4 text-reset'>
            <ImFacebook />
          </a>
          <a href='#home' class='me-4 text-reset'>
            <ImTwitter />
          </a>
          <a href='#home' class='me-4 text-reset'>
            <ImGoogle />
          </a>
          <a href='#home' class='me-4 text-reset'>
            <FiInstagram />
          </a>
          <a href='#home' class='me-4 text-reset'>
            <FaLinkedin />
          </a>
          <a href='#home' class='me-4 text-reset'>
            <ImGithub />
          </a>
        </div>
      </section>

      <section class=''>
        <div class='container text-center text-md-start mt-3'>
          <div class='row mt-3'>
            <div class='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 class='text-uppercase fw-bold mb-4'>
                <i class='fas fa-gem me-3'></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div class='col-md-2 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h6 class='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' class='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  Laravel
                </a>
              </p>
            </div>

            <div class='col-md-3 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h6 class='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' class='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' class='text-reset'>
                  Help
                </a>
              </p>
            </div>

            <div class='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2'>
              <h6 class='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i class='fas fa-home me-3'></i> New York, NY 10012, US
              </p>
              <p>
                <i class='fas fa-envelope me-3'></i>
                info@example.com
              </p>
              <p>
                <i class='fas fa-phone me-3'></i> + 01 234 567 88
              </p>
              <p>
                <i class='fas fa-print me-3'></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class='copyright text-center p-3'>
        © 2021 Copyright:
        <span class='fw-bold'> Bozhidar Tomov</span>
      </div>
    </footer>
  );
}

export default Footer;
