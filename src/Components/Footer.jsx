const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} | Developed by  
        <a 
          href="https://github.com/faizan0209" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
        > Muhammad Faizan</a>
      </p>
    </footer>
  );
};

// Footer Styles
const styles = {
  footer: {
    backgroundColor: "#007bff", // Bootstrap primary color
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    position: "fixed",
    bottom: "0",
    width: "100%",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "5px",
    fontWeight: "bold",
  },
};

export default Footer;
