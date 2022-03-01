import React, { useState, useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import axios from "axios";

export default function UpdateComment_reply(props) {
  const [dataReply, setDataReply] = useState(props.data);
  const [replyShow, setReplyShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataReply((prevState) => ({ ...prevState, [name]: value }));
  };
  /* useEffect(async () => {
    console.log(dataReply);
    await axios
      .get(
        `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${dataReply.CommentFeatureId}/Comment_reply/${dataReply.id}`,
        dataReply
      )
      .then((response) => {
        setDataReply(response.data);
      });
  }, [dataReply.id]); */

  const Update_reply = (id) => {
    axios.put(
      `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${dataReply.CommentFeatureId}/Comment_reply/${dataReply.id}`,
      dataReply
    );
    console.log(dataReply);
    props.popUp(false);
  };

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
              Update_reply();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
