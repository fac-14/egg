import React from "react";
import { getGithubNames } from "../Api/getGithubNames";
import { shuffleArray } from "../Api/shuffle";
import factCards from "../Api/factCards";
import NameCard from "./NameCard";
import "../css/card-layout";
import "../css/cards";

export default class CardLayout extends React.Component {
  state = {
    teamData: null,
    totalClicks: 0,
    clicked1: [],
    clicked2: [],
    matched: []
  };
  componentDidMount() {
    getGithubNames(
      "https://api.github.com/teams/2786804/members?access_token="
    ).then(data => {
      const dataTwo = data.filter(filtered => {
        return filtered.id !== 12933862 && filtered.id !== 22013117;
      });
      const allCardData = shuffleArray(dataTwo.concat(factCards));
      this.setState({ teamData: allCardData });
    });
  }
  handleOnClick = id => {
    const { totalClicks, clicked1, clicked2, matched } = this.state;
    if (clicked1.length === 0 && clicked2.length === 0) {
      this.setState({ totalClicks: totalClicks + 1, clicked1: [id] });
    }
    if (clicked1.length === 0 && clicked2.length === 1) {
      this.setState({
        totalClicks: totalClicks + 1,
        clicked1: [id],
        clicked2: [],
        matched: [clicked2[0], ...matched]
      });
    }
    if (clicked1.length === 1 && clicked2.length === 0) {
      if (clicked1[0] === id) {
        return;
      } else if (parseInt(clicked1[0]) === id || parseInt(id) === clicked1[0]) {
        this.setState({
          totalClicks: totalClicks + 1,
          clicked1: [],
          clicked2: [id],
          matched: [clicked1[0], ...matched]
        });
      } else {
        this.setState({
          totalClicks: totalClicks + 1,
          clicked2: [id]
        });
        setTimeout(() => {
          this.setState({ clicked1: [], clicked2: [] });
        }, 700);
      }
    }
    // this.setState({ totalClicks: totalClicks + 1 });
  };

  render() {
    console.log(this.state);
    if (!this.state.teamData) {
      return <h3>...Loading</h3>;
    }
    return (
      <div className="card-grid">
        {this.state.teamData.map((team, index) => (
          <NameCard
            onClick={() => this.handleOnClick(team.id)}
            chosen1={this.state.clicked1.includes(team.id)}
            chosen2={this.state.clicked2.includes(team.id)}
            matched={this.state.matched.includes(team.id)}
            key={index}
            {...team}
          />
        ))}
      </div>
    );
  }
}
