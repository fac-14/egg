import React from 'react';
import { getGithubNames } from '../Api/getGithubNames';
import NameCard from './NameCard';

export default class CardLayout extends React.Component {
  state = {
    teamData: null
  };
  componentDidMount() {
    getGithubNames(
      'https://api.github.com/teams/2786804/members?access_token='
    ).then(data => {
      this.setState({ teamData: data });
      console.log(data);
    });
  }
  render() {
    if (!this.state.teamData) {
      return <h3>...Loading</h3>;
    }
    const { avatar_url, login } = this.state.teamData[1];
    return (
      <div>
        {login}
        <img />
      </div>
    );
  }
}