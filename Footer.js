function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© 2025 EduSpark. All rights reserved.</p>
      <p>
        Follow us: 
        <a href="https://twitter.com/eduspark" target="_blank" rel="noreferrer" style={linkStyle}> Twitter </a> | 
        <a href="https://facebook.com/eduspark" target="_blank" rel="noreferrer" style={linkStyle}> Facebook </a> | 
        <a href="https://linkedin.com/company/eduspark" target="_blank" rel="noreferrer" style={linkStyle}> LinkedIn </a>
      </p>
    </footer>
  );
}

const footerStyle = {
  textAlign: "center",
  padding: "1px",
  backgroundColor: "#1e88e5",
  color: "white",
  
  bottom: 0,
  width: "100%",
};

const linkStyle = {
  color: "white",
  marginLeft: "5px",
  marginRight: "5px",
  textDecoration: "none",
};

export default Footer;
