import React from "react";
import './css/footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailIcon from '@mui/icons-material/Mail';


function Footer() {
  return (
    <>
      <div className="social-accounts-link">
        <InstagramIcon className="s-a-l-i"/>
        <YouTubeIcon className="s-a-l-i"/>
        <MailIcon className="s-a-l-i"/>
      </div>
      <div className="footer-text">Copyright ©2023. All Rights Reserved.</div>
    </>
  );
}

export default Footer;
