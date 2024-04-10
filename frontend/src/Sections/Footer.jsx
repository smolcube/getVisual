import React from 'react';

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer__links">
      <h5>our services</h5>
      <div className="footer__links--container">
        <ul>
        <li><a href="/#">Logo design</a></li>
        <li><a href="/#">Identity design</a></li>
        <li><a href="/#">Illustration</a></li>
        <li><a href="/#">Print design</a></li>
        <li><a href="/#">User Interface</a></li>
      </ul>
      <ul>
        <li><a href="/#">Packaging</a></li>
        <li><a href="/#">Motion</a></li>
        <li><a href="/#">Print design</a></li>
        <li><a href="/#">Print design</a></li>
        <li><a href="/#">Print design</a></li>
      </ul>
      </div>

      <div className="footer__socials--media">
      <h5>contact us</h5>
        <div className='social-media-item'>
          <img src={process.env.PUBLIC_URL + '/assets/at.svg'} alt="" />
          <a href="/#">getvisualMarket@gmail.com</a>
        </div>          
        <div className='social-media-item'>
          <img src={process.env.PUBLIC_URL + '/assets/number.svg'} alt="" />
          <a href="/#">+01 234 567 89</a>
        </div>
        
        </div>
      </div>
      

      <div className="footer__socials">
        <img className='logo' src={process.env.PUBLIC_URL + '/assets/footer-logo.png'} alt="" />
        <div className="footer__socials--media">
          <div className='social-media-item'>
        <img src={process.env.PUBLIC_URL + '/assets/instagram.svg'} alt="" />
        <a href="http://instagram.com/getvisual.ly">getvisual.ly</a>
          </div>
          <div className='social-media-item'>
        <img src={process.env.PUBLIC_URL + '/assets/logo-white.png'} alt="" />
        <a href="http://x.com/getvisual.ly">getvisual.ly</a>
          </div>
        </div>
      </div>
    </section>
  )
}
