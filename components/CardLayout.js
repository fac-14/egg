import React from 'react';
import { getGithubNames } from '../Api/getGithubNames';
import factCards from '../Api/factCards';
import NameCard from './NameCard';

export default class CardLayout extends React.Component {
  state = {
    teamData: null
  };
  componentDidMount() {
    getGithubNames(
      'https://api.github.com/teams/2786804/members?access_token='
    ).then(data => {
      const allCardData = data.concat(factCards);
      this.setState({ teamData: allCardData });
      console.log(allCardData);
    });
  }
  render() {
    if (!this.state.teamData) {
      return <h3>...Loading</h3>;
    }
    return (
      <div>
        {this.state.teamData.map(team => (
          <NameCard key={team.id} {...team} />
        ))}
      </div>
    );
  }
}
