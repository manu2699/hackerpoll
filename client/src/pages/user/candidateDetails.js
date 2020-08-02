import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import TopBar from "../../components/topBar";
import { FaUserCheck } from "react-icons/fa";

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
        this.setState({ ...data })
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
      noToken: () => this.props.history.push("/signin")
    });
  }

  getUser = async () => {
    await doRequest({
      url: `/api/user/auth/`,
      method: "get",
      onSuccess: (data) => {
        console.log(data)
        this.setState({ isVoted: data.isVoted, isLoading: false })
      },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
    });
  }

  componentDidMount = async () => {
    await this.getCandidate()
    await this.getUser()
    // let voteCheck = localStorage.getItem("voted");
    // if (voteCheck !== null)
    //   this.setState({ isVoted: true })
  }

  voteCandidate = async () => {
    await doRequest({
      url: `/api/user/candidate/vote/${this.props.match.params.id}`,
      method: "put",
      onSuccess: () => {
        // localStorage.setItem("voted", "true");
        alert("Thanks for voting..")
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
              <TopBar {...this.props} />
              <div className="candidates" style={{ flexDirection: "column" }}>
                <div className="Card" style={{ width: "300px" }}>
                  <p>Name : <span>{this.state.name} </span></p>
                  <p>Challenges Solved : <span>{this.state.challengeSolved}</span></p>
                  <p>Expertise Level : <span>{this.state.expertiseLevel}</span></p>
                  <p>No of Votes : <span>{this.state.noOfVotes}</span></p>
                  <p>Data Structures : <span>{this.state.expertIn.dataStructures}</span></p>
                  <p>Algorithm : <span>{this.state.expertIn.algorithms}</span> </p>
                  <p>C++ : <span>{this.state.expertIn.cpp}</span></p>
                  <p>Java : <span>{this.state.expertIn.java}</span></p>
                  <p>Python : <span>{this.state.expertIn.python}</span></p>
                  <p>JavaScript : <span>{this.state.expertIn.javascript}</span></p>
                  <FaUserCheck className="bgIco" />
                </div>
                {!this.state.isVoted ?
                  <button className="primaryButton" onClick={() => this.voteCandidate()}>
                    Vote
                  </button> :
                  <h4>You have already registered your vote..</h4>
                }
              </div>
            </>
          )}
      </div>
    );
  }
}

export default CandidatePage;

