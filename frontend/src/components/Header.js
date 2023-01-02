import { Container, Navbar } from 'react-bootstrap';
const navbarStyle = {
  backgroundColor: 'lightblue',
};

function Header({ title }) {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
