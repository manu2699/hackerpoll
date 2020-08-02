import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import url from "../../utils/urls";
import io from "socket.io-client";
import TopBar from "../../components/topBar";
import { FaUserPlus } from "react-icons/fa";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      copy: [],
    }
  }

  getCandidates = async () => {
    await doRequest({
      url: `/api/user/candidate/`,
      method: "get",
      onSuccess: (data) => { this.setState({ data, copy: data, isLoading: false }) },
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

  searchCandidates = async () => {
    let searchUtil = this.state.copy;
    let filter = await searchUtil.filter(data => {
      let name = data.name.toLowerCase()
      let toCheck = this.state.search.toLowerCase();
      return (name.substr(0, toCheck.length) === toCheck)
    })
    this.setState({ data: filter })
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader className="centerPage" type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <>
              <TopBar {...this.props} isHome={true} />
              {/* <h1>{"<HACKER POLL />"}</h1> */}
              <form>
                <input type="text" placeholder="Search Your Candidate" value={this.state.search} onChange={e => {
                  this.setState({ search: e.target.value })
                }} />
                <center style={{ display: "flex", justifyContent: "center", }}>
                  <div className="primaryButton" onClick={() => { this.searchCandidates() }}>
                    Search
                    </div>
                  <div className="secButton" onClick={() => { this.setState({ data: this.state.copy, search: "" }) }}>
                    Clear
                  </div>
                </center>
              </form>
              <div className="candidates">
                {this.state.data.map((candidate, index) => {
                  return (
                    <div className="Card" onClick={() => this.props.history.push(`/candidate/${candidate._id}`)} key={index}>
                      <p>Name : <span>{candidate.name} </span></p>
                      <p>Challenges Solved : <span>{candidate.challengeSolved}</span></p>
                      <p>Expertise Level : <span>{candidate.expertiseLevel}</span></p>
                      <p>No of Votes : <span>{candidate.noOfVotes}</span></p>
                      <FaUserPlus className="bgIco" />
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

