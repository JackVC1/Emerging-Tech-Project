import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  function goBack() {
    // attempt a history back; harmless if there's no history
    try { window.history.back(); } catch (e) { /* ignore */ }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <button className="footer-back" onClick={goBack} aria-label="Go back">←</button>
        <p className="footer-text">&copy; {currentYear} Quiz Game. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
