import "./SeasonDisplay.css";
import React from "react";

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: "sun"
  },
  winter: {
    text: "Brrr! It's chilly!",
    iconName: "snowflake"
  }
}

const isSummerInNorth = (month) => {
  return (month > 3 && month < 9) ? true : false;
}

const getSeason = (lat, month) => {
  return (isSummerInNorth(month) && lat > 0) ? 'summer' : 'winter';
}

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitude, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];

  return (
    <div className={`season-display ${season}`}>
      <i className={`icon massive ${iconName} icon-left`}></i>
      <h1>{text}</h1>
      <i className={`icon massive ${iconName} icon-right`}></i>
    </div>
  );
}

export default SeasonDisplay;