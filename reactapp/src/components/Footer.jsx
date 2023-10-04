import React from 'react';

const Footer = () => {
  return (
    <footer data-testid = "app_footer"className='footer'>
      <p>&copy; {new Date().getFullYear()} Library Collection App</p>
    </footer>
  );
};

export default Footer;
