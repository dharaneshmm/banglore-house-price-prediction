import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.png'; // Update with your logo path
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""} style={{ backgroundImage: `url('path-to-your-background-image.jpg')`, backgroundSize: 'cover' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ width: '50px' }} />
        </Navbar.Brand>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2 style={{ color: 'black', margin: 0 }}>Bangalore House Price Prediction</h2>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'black', fontSize: 'medium' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/prediction" style={{ color: 'black', fontSize: 'medium' }}>Prediction</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
