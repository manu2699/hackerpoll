import React, { Component } from "react";
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import TopBar from "../../components/topBar";
import { FaRegEye } from "react-icons/fa";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  getCandidates = async () => {
    await doRequest({
      url: `/api/admin/candidate/`,
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
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader className="centerPage" type="Oval" color="#1194ff" height={150} width={150} />
        ) : (
            <>
              {/* <h1>{"<HACKER POLL />"}</h1> */}
              <TopBar {...this.props} type="admin" isHome={true} />
              <button className="secButton" onClick={() => this.props.history.push("/admin/add/candidate")}>
                Add Candidate
              </button>
              <table>
                <thead>
                  <tr>
                    <th id="small">S.No</th>
                    <th>Name</th>
                    <th>Challenges Solved</th>
                    <th>Expertise Level</th>
                    <th id="small">No of Votes</th>
                    {/* <th id="small"> </th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((candidate, index) => {
                    return (
                      <tr key={index} onClick={() => this.props.history.push(`/admin/edit/candidate/${candidate._id}`)}>
                        <td id="small">{index + 1}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.challengeSolved}</td>
                        <td>{candidate.expertiseLevel}</td>
                        <td id="small">{candidate.noOfVotes}</td>
                        <td style={{ width: "3%", textAlign: "center" }}><FaRegEye /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          )}
      </div>
    );
  }
}

export default HomePage;

