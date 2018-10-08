import React from "react";
import cardImg from "../assets/black-jack.svg";

const NameCard = ({
  id,
  login,
  avatar_url,
  fact,
  imgFact,
  onClick,
  chosen1,
  chosen2,
  matched
}) => {
  return (
    <div onClick={onClick} className="card-back">
      {chosen1 || chosen2 || matched ? (
        <div className={"card-" + (fact ? "fact" : "name")}>
          <img
            src={imgFact ? imgFact : avatar_url}
            className={imgFact ? "imgFact" : "imgAvatar"}
          />
          <p className={fact ? "fact" : "username"} value={id}>
            {fact ? fact : login}
          </p>
        </div>
      ) : (
        <h1>FaC 14</h1>
      )}
    </div>
  );
};

export default NameCard;
