import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

import { signOutUser } from "../../components/Authentication/firebaseAuth";
import { RootState } from "../../store/store";

import * as styles from "./Header.module.scss";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userName = useSelector((state: RootState) => state.user?.user?.displayName);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { to: "/browse", label: "Home" },
    { to: "/tvShows", label: "TV Shows" },
    { to: "/bollywood", label: "Bollywood" },
    { to: "/browse", label: "News & Popular" }
  ];

  return (
    <div className={styles.container}>
      <Link to="/browse">
        <img src="gemflix-logo.png" alt="Logo" className={styles.img} />
      </Link>
      {userName && (
        <div className={styles.navContainer}>
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.nav}>
              {navLinks.map((link,index) => (
                <li key={index}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.right}>
              <Link to="/search">
                <Search className={styles.search} />
              </Link>
              <button className={styles.button} onClick={() => signOutUser()}>
                Sign Out
              </button>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className={styles.mobileNavToggle} onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className={styles.mobileNav}>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.to} onClick={toggleMobileMenu}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
                <li className={styles.mobileNavActions}>
                  <Link to="/search" onClick={toggleMobileMenu}>
                    <Search size={20} /> Search
                  </Link>
                  <button onClick={() => { signOutUser(); toggleMobileMenu(); }}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};