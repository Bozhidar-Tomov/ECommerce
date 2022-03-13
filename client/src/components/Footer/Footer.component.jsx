import React from "react";

import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { ImGoogle } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";

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
        <div className='d-none d-lg-block text-primary fs-5'>
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
              <h2 className='text-uppercase fw-bold mb-4 fs-6'>Our company</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore nobis
                officia, numquam quasi soluta facere atque reprehenderit mollitia error?
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h2 className='text-uppercase fw-bold mb-4 fs-6'>Products</h2>
              <p>
                <a href='/store' className='text-reset'>
                  Laptops
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Smartphones
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gaming PCs
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-2'>
              <h2 className='text-uppercase fw-bold mb-4 fs-6'>Useful links</h2>
              <p>
                <a href='/terms-of-service' className='text-reset'>
                  Terms of service
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Store
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2'>
              <h2 className='text-uppercase fw-bold mb-4 fs-6'>Contact</h2>
              <p>
                <MdLocationOn size={24} /> Varna, bld. Slivnitsa 2, BG
              </p>
              <p>
                <MdEmail size={24} /> info@example.com
              </p>
              <p>
                <MdOutlinePhoneIphone size={24} /> + 01 234 567 88
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='copyright text-center p-3'>
        © 2021 Copyright:
        <span className='fw-bold'> Tech Checkie</span>
      </div>
    </footer>
  );
}

export default Footer;
