import React from 'react';
import { getGithubNames } from '../Api/getGithubNames';
import { shuffleArray } from '../Api/shuffle';
import factCards from '../Api/factCards';
import NameCard from './NameCard';
import '../css/card-layout';
import '../css/cards';

export default class CardLayout extends React.Component {
  state = {
    teamData: null,
    clicked: []
  };
  componentDidMount() {
    getGithubNames(
      'https://api.github.com/teams/2786804/members?access_token='
    ).then(data => {
      const dataTwo = data.filter(filtered => {
        return filtered.id !== 12933862 && filtered.id !== 22013117;
      });
      const allCardData = shuffleArray(dataTwo.concat(factCards));
      // const shuffledCards = shuffleArray(allCardData);
      this.setState({ teamData: allCardData });
      // console.log(shuffledCards);
    });
  }

  handleOnClick = id => {
    this.setState(prevState => {
      const { clicked } = prevState;

      // if id already exists
      console.log(clicked);
      if (clicked.length >= 1) {
        if (id > 99999999) {
          const match = clicked.includes(id / 10);
          console.log(match);
        } else {
          const match1 = clicked.includes(id * 10);
          console.log(match1);
        }
      }
      // this.setState({ clicked: [] });
      return { clicked: [id, ...clicked] };
    });
    console.log(this.state);
  };

  render() {
    if (!this.state.teamData) {
      return <h3>...Loading</h3>;
    }
    return (
      <div className="card-grid">
        {this.state.teamData.map(team => (
          <NameCard
            onClick={() => this.handleOnClick(team.id)}
            chosen={this.state.clicked.includes(team.id)}
            key={team.id}
            {...team}
          />
        ))}
      </div>
    );
  }
}
