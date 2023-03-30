import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to='/home'>Home</Link>
      <Link to='/aboutus'>AboutUs</Link>
      <Link to='/contact'>Contact</Link>
      <Link to='/jobs'>Jobs</Link>
    </nav>
  );
}

export default Nav;