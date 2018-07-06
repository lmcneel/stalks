import React from "react";

//this is the small component on the petfolio page that shows the portfolio value

const PortfolioValue = (props) => {
  return (
    <div>
      <div className="">Portfolio Value{props.portfolioValue}</div>
    </div>
  );
};

export default PortfolioValue;