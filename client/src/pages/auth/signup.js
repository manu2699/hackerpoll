import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      type: "user",
      isLoading: true
    }
  }

  signup = async e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPass) {
      this.setState({ isLoading: true })
      await doRequest({
        url: `/api/${this.state.type}/auth/signup`,
        method: "post",
        body: { ...this.state },
        onSuccess: () => this.signin(),
        onError: (err) => {
          this.setState({ isLoading: false })
          alert(err)
        },
      });
    } else {
      alert("Both Passwords must be same")
    }
  }

  signin = async () => {
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

  componentDidMount = () => {
    let token = localStorage.getItem("token")
    if (token === null)
      this.setState({ isLoading: false })
    else
      this.props.history.push("/signin")
  }

  render() {
    return (
      <div className="centerPage">
        {this.state.isLoading ? (
          <Loader type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <form onSubmit={this.signup}>
              <h2>Create new account</h2>

              <input type="text" placeholder="Name" onChange={e =>
                this.setState({ name: e.target.value })} />

              <input type="text" placeholder="e-Mail" onChange={e =>
                this.setState({ email: e.target.value })} />

              <input type="password" placeholder="Password" onChange={e =>
                this.setState({ password: e.target.value })} required />

              <input type="password" placeholder="Re-type Password" onChange={e =>
                this.setState({ confirmPass: e.target.value })} required />

              <h4>You are an ?</h4>
              <select value={this.state.type} onChange={e => this.setState({ type: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <br />
              <center>
                <input type="submit" value="Sign Up" />
                <a href={`/signin`}><h4>Already having an account ?</h4></a>
              </center>
            </form>
          )}
      </div>
    );
  }
}

export default LoginPage;

