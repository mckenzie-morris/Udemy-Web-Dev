import React from 'react';

const newDate = new Date();
const currentYear = newDate.getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright © {currentYear}</p>
    </footer>
  );
}

export default Footer;
