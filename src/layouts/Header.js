import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {HOST} from "../config.js";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";

let user = {
  first_name: "Guest",
  last_name: "",
  email: null,
  password: null,
  contents: []
}


const Header = ({token}) => {
  const navigate = useNavigate();

  const getUser = () => {
    if(user.first_name !== "Guest") return;
    let userFound = localStorage.getItem("user");
    if(userFound !== null){
      user = JSON.parse(userFound)
    }
  }

  getUser();

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.hash = '';
  }


  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {/* <NavItem>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem> */}
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{user.first_name + " " + user.last_name}</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem onClick={(e) => logout(e)}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
