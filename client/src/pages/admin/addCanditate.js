import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import TopBar from "../../components/topBar";

class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      expertiseLevel: 1,
      challengeSolved: 0,
      expertIn: {
        dataStructures: 1,
        algorithms: 1,
        cpp: 1,
        java: 1,
        python: 1,
        javascript: 1,
      },
      isLoading: true,
      allUsers: [],
    }
  }

  addCandidate = async e => {
    e.preventDefault();
    this.setState({ isLoading: true })
    await doRequest({
      url: `/api/admin/candidate/`,
      method: "post",
      body: { ...this.state },
      onSuccess: () => {
        alert("candidate added")
        this.props.history.goBack()
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
    });
  }

  getUsers = async () => {
    await doRequest({
      url: `/api/admin/candidate/users/tolink`,
      method: "get",
      onSuccess: (data) => { this.setState({ allUsers: data, isLoading: false }) },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
    });
  }

  componentDidMount = async () => {
    await this.getUsers();
  }

  render() {
    return (
      <div className="container">
        <TopBar {...this.props} type="admin" />
        {this.state.isLoading ? (
          <Loader className="centerPage" type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <form onSubmit={this.addCandidate}>
              <h2>Create new Candidate</h2>

              <h3>Candidate Name* : </h3>
              <input type="text" placeholder="Name" onChange={e =>
                this.setState({ name: e.target.value })} required />

              <h3>(Optional) User to Link : </h3>
              <input type="text" list="tolink" placeholder="Specify email id of user to Link" onChange={e =>
                this.setState({ linkedUser: e.target.value.split("-")[1] })} />

              <datalist id="tolink">
                {this.state.allUsers.map((user, index) => {
                  return (<option key={index} value={`${user.email}-${user._id}`}>{user.email}</option>)
                })}
              </datalist>

              <h3>Challenges Solved* : </h3>
              <input type="number" onChange={e =>
                this.setState({ challengeSolved: e.target.value })} required />

              <h3>Expertise Level* : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({ expertiseLevel: e.target.value })} required />

              <h3>Data Structures : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    dataStructures: e.target.value
                  }
                })} required />

              <h3>Algorithm : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    algorithms: e.target.value
                  }
                })} />


              <h3>C++ : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    cpp: e.target.value
                  }
                })} />


              <h3>Java : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    java: e.target.value
                  }
                })} />


              <h3>Python : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    python: e.target.value
                  }
                })} />


              <h3>JavaScript : </h3>
              <input type="number" min={1} max={5} placeholder="Specify between 0 to 5" onChange={e =>
                this.setState({
                  expertIn: {
                    ...this.state.expertIn,
                    javascript: e.target.value
                  }
                })} />

              <center>
                <input type="submit" value="Add Candidate" />
              </center>
            </form>
          )}
      </div>
    );
  }
}

export default AddCandidate;

