import React from "react";
import "../Style/header.css";
import Modal from "react-modal";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "",
      display: "none",
      loginModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: undefined,
    };
  }
  componentDidMount() {
    const path = this.props.history.location.pathname;
    this.setBackground(path);
  }

  setBackground = (path) => {
    let bg, display;
    if (path === "/") {
      bg = "black";
      display = "none";
    } else {
      bg = "#ff0000";
    }
    this.setState({ backgroundColor: bg, display: display });
  };

  handleLogin = () => {
    this.setState({ loginModalIsOpen: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, loggedInUser: undefined });
  };

  responseGoogle = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    this.setState({
      isLoggedIn: true,
      loggedInUser: decoded.name, // Use decoded.name instead of response.name
      loginModalIsOpen: false,
    });
  };
  

  render() {
    const {
      backgroundColor,
      display,
      loginModalIsOpen,
      isLoggedIn,
      loggedInUser,
    } = this.state;
    return (
      <>
        <div className="topBar" style={{ backgroundColor: backgroundColor }}>
          <div className="navBar">
            <div className="logo" style={{ display: display }}>
              e!
            </div>
            {!isLoggedIn ? (
              <>
                <button className="login" onClick={this.handleLogin}>
                  Login
                </button>
                <button className="create">Create an account</button>
              </>
            ) : (
              <>
                <button className="login" >
                  {loggedInUser}
                </button>
                <button className="create" onClick={this.handleLogout}>
                  Logout
                </button>
              </>
            )}
            <Modal isOpen={loginModalIsOpen} style={customStyles}>
              <div>
                <GoogleOAuthProvider clientId="570168900038-78l0i3c09uor0n5n8lc0s342rk0tnnnl.apps.googleusercontent.com">
                  <GoogleLogin
                    // onSuccess={(credentialResponse) => {
                    //   const decoded = jwtDecode(credentialResponse.credential);
                    //   console.log(decoded);
                    //   this.setState({
                    //     isLoggedIn: true,
                    //     loggedInUser: response.name,
                    //   });
                    // }}
                    onSuccess={this.responseGoogle}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}
export default Header;
