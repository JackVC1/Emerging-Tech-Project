import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Quiz Game. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
