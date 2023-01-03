import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
const navbarStyle = {
  backgroundColor: '#eee',
};

function Header({ title }) {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo
          alt={title}
          title={title}
          style={{ maxWidth: '25rem', maxHeight: '4rem' }}
        />
      </Container>
    </Navbar>
  );
}

export default Header;
