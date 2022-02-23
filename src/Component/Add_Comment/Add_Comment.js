import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
export default function Add_Comment(props) {
  return props.main ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <AiFillCloseSquare />
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
