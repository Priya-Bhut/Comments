import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

export default function UpdateComment_reply(props) {
  const [dataReply, setDataReply] = useState(props.data);
  const [replyShow, setReplyShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataReply((prevState) => ({ ...prevState, [name]: value }));
  };
  const UpdateComment_reply = () => {};
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <form className="form">
          <div className="pageTitle title">
            <span>UPDATE REPLY COMMENT HERE...</span>
            <AiFillCloseSquare
              className="closeSquare"
              onClick={() => setReplyShow(false)}
            />
          </div>
          <textarea
            className="message formEntry"
            placeholder="Write a Comment"
            name="reply"
            onChange={(e) => handleChange(e)}
            value={dataReply.reply}
          ></textarea>
          <button
            className="submit formEntry"
            type="button"
            onClick={() => {
              UpdateComment_reply();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
