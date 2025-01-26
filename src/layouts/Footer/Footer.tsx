import * as styles from "./Footer.module.scss"; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <a href="#" className={styles.logo}>
            <img src="gemflix-logo.png" className={styles.logoImage} alt="Gemflix Logo" />
          </a>
          <nav className={styles.navigation}>
            <ul className={styles.links}>
              {[
                { name: "About", link: "#about" },
                { name: "Privacy Policy", link: "#privacy" },
                { name: "Contact", link: "https://www.linkedin.com/in/profile-ankit/", external: true }
              ].map(({ name, link, external }) => (
                <li key={name}>
                  <a 
                    href={link} 
                    className={styles.link}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <hr className={styles.divider} />
        <div className={styles.footerBottom}>
          <span className={styles.footerText}>
            © {currentYear} Gemflix. Crafted with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/profile-ankit/"
              rel="noreferrer"
              target="_blank"
              className={styles.footerLink}
            >
              Ankit
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};