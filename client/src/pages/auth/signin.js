import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "user",
      isLoading: true,
      isAuth: false
    }
  }

  signin = async e => {
    e.preventDefault();
    this.setState({ isLoading: true })
    await doRequest({
      url: `/api/${this.state.type}/auth/signin`,
      method: "post",
      body: { ...this.state },
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token)
        localStorage.setItem("type", this.state.type)
        if (this.state.type === "admin")
          this.props.history.push(`/${this.state.type}`)
        else
          this.props.history.push(`/`)
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        if (typeof (err) === "object")
          alert(err[0].msg)
        else
          alert(err)
      },
    });
  };

  componentDidMount = async () => {
    let token = await localStorage.getItem("token")
    let type = await localStorage.getItem("type")
    if (token === null) {
      this.setState({ isLoading: false })
    } else {
      this.setState({ isLoading: false, type, isAuth: true })
    }
  }

  logOut = () => {
    this.setState({ isLoading: true })
    localStorage.removeItem("token")
    localStorage.removeItem("type")
    this.setState({ isLoading: false, type: "user", isAuth: false })
  }

  render() {
    return (
      <div className="centerPage">
        {this.state.isLoading ? (
          <Loader type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <>
              {this.state.isAuth ?
                <div>
                  <h3>You are Logged in as {this.state.type}</h3>
                  <center>
                    <button className="primaryButton" onClick={() => { this.logOut() }}>
                      LogOut
                    </button>
                  </center>
                </div>
                :
                <form onSubmit={this.signin}>
                  <h2>Sign in to your account</h2>
                  <input type="text" placeholder="e-Mail" onChange={e =>
                    this.setState({ email: e.target.value })} required />
                  <input type="password" placeholder="Password" onChange={e =>
                    this.setState({ password: e.target.value })} required />
                  <br />
                  <h4>You are an ?</h4>
                  <select onChange={e => this.setState({ type: e.target.value })} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <center>
                    <input type="submit" value="Sign In" />
                    <a href={`/signup`}><h4>Create New Account</h4></a>
                  </center>
                </form>
              }
            </>
          )}
      </div>
    );
  }
}

export default LoginPage;

