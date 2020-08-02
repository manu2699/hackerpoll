import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import url from "../../utils/urls";
import io from "socket.io-client";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  getCandidates = async () => {
    await doRequest({
      url: `/api/user/candidate/`,
      method: "get",
      onSuccess: (data) => { this.setState({ data, isLoading: false }) },
      onError: (err) => {
        this.setState({ isLoading: false })
        alert(err)
      },
      noToken: () => this.props.history.push("/signin")
    });
  }

  componentDidMount = async () => {
    await this.getCandidates()

    let socket = io.connect(url);
    socket.on(`Vote`, async () => {
      await this.getCandidates()
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader className="centerPage" type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <>
              <h1>{"<HACKER POLL />"}</h1>
              <div className="candidates">
                <input type="text" placeholder="Search Your Candidate" />
                {this.state.data.map((candidate, index) => {
                  return (
                    <div className="Card" onClick={() => this.props.history.push(`/candidate/${candidate._id}`)} key={index}>
                      <p>Name: <span>{candidate.name} </span></p>
                      <p>Challenges Solved : <span>{candidate.challengeSolved}</span></p>
                      <p>Expertise Level: <span>{candidate.expertiseLevel}</span></p>
                      <p>No of Votes : <span>{candidate.noOfVotes}</span></p>
                    </div>
                  )
                })}
              </div>
            </>
          )}
      </div>
    );
  }
}

export default HomePage;

