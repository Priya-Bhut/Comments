import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

export default function UpdateComment(props) {
  const [show, setShow] = useState(false);
  const [dataValue, setDataValue] = useState(props.data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataValue((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(async () => {
    await axios
      .get(
        `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${dataValue.id}`
      )
      .then((response) => {
        setDataValue(response.data);
      });
  }, [dataValue.id]);

  const UpdateComment = (id) => {
    axios.put(
      `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${dataValue.id}`,
      dataValue
    );
    console.log(dataValue);
    props.popUp(false);
  };
  const togglePopup = (e) => {
    setShow(!show);
    props.popUp(false);
  };
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <form className="form">
          <div className="pageTitle title">
            <span>UPDATE COMMENT HERE...</span>
            <AiFillCloseSquare className="closeSquare" onClick={togglePopup} />
          </div>
          <textarea
            className="message formEntry"
            placeholder="Write a Comment"
            name="comment"
            onChange={handleChange}
            value={dataValue.comment}
          ></textarea>
          <button
            className="submit formEntry"
            type="button"
            onClick={() => {
              UpdateComment();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
