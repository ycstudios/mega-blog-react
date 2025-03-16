import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Copyright */}
          <div className="space-y-4">
            <Logo width="120px" />
            <p className="text-sm text-gray-400">
            <a href="https://yash-chandanshive.vercel.app/" target='_blank'>Made with ❤️ By Yash Chandanshive</a>
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" to="/">Features</Link></li>
              <li><Link className="hover:text-white" to="/">Pricing</Link></li>
              <li><Link className="hover:text-white" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-white" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" to="/">Account</Link></li>
              <li><Link className="hover:text-white" to="/">Help</Link></li>
              <li><Link className="hover:text-white" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-white" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" to="/">Terms & Conditions</Link></li>
              <li><Link className="hover:text-white" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
