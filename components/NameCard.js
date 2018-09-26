import React from 'react';

const NameCard = ({ login, avatar_url }) => {
  return (
    <div className="name-card">
      <img src={avatar_url} className="avatar" />
      <h1 className="username">{login}</h1>
    </div>
  );
};

export default NameCard;
