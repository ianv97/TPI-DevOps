import React from "react";
// import { MdArrowBack } from "react-icons/lib/md";
// import { FaCircle } from "react-icons/lib/fa";

const NavigationPanel = props => {
  return (
    <div className="login NavigationPanel">
      {/* <MdArrowBack onClick={props.initialState} className="login back" /> */}
      {/* <div style={{ flex: 2 }} /> */}
      <img src="/favicon.png" style={{ width: "100%", marginTop: "210px" }} alt="logo" />
    </div>
  );
};

export default NavigationPanel;
