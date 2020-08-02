import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"

class CandidatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isVoted: false,
    }
  }

  getCandidate = async () => {
    await doRequest({
      url: `/api/user/candidate/${this.props.match.params.id}`,
      method: "get",
      onSuccess: (data) => {
        console.log(data)
        this.setState({ ...data, isLoading: false })
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
      noToken: () => this.props.history.push("/signin")
    });
  }

  componentDidMount = async () => {
    await this.getCandidate()
    let voteCheck = localStorage.getItem("voted");
    if (voteCheck !== null)
      this.setState({ isVoted: true })
  }

  voteCandidate = async () => {
    await doRequest({
      url: `/api/user/candidate/vote/${this.props.match.params.id}`,
      method: "put",
      onSuccess: (data) => {
        localStorage.setItem("voted", "true");
        this.props.history.goBack()
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader className="centerPage" type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <>
              <h1>{"<HACKER POLL />"}</h1>
              <div className="candidates" style={{ flexDirection: "column" }}>
                <div className="Card" style={{ width: "300px" }}>
                  <p>Name: <span>{this.state.name} </span></p>
                  <p>Challenges Solved : <span>{this.state.challengeSolved}</span></p>
                  <p>Expertise Level: <span>{this.state.expertiseLevel}</span></p>
                  <p>No of Votes : <span>{this.state.noOfVotes}</span></p>
                  <p>Data Structures : <span>{this.state.expertIn.dataStructures}</span></p>
                  <p>Algorithm : <span>{this.state.expertIn.algorithms}</span> </p>
                  <p>C++ : <span>{this.state.expertIn.cpp}</span></p>
                  <p>Java : <span>{this.state.expertIn.java}</span></p>
                  <p>Python : <span>{this.state.expertIn.python}</span></p>
                  <p>JavaScript : <span>{this.state.expertIn.javascript}</span></p>
                </div>
                {!this.state.isVoted &&
                  <button className="primaryButton" onClick={() => this.voteCandidate()}>
                    Vote
                  </button>
                }
              </div>
            </>
          )}
      </div>
    );
  }
}

export default CandidatePage;

