import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="container mb-2" color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="counter">
                Counter
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="table">
                DataTable
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
