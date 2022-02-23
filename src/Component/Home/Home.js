import React, { useEffect, useState } from "react";
import "./Home.css";
import { AiFillCloseSquare } from "react-icons/ai";
import axios from "axios";

export default function Home() {
  const [show, setShow] = useState(false);
  const [dataValue, setDataValue] = useState({
    comment: "",
  });
  const [apiData, setApiData] = useState([]);
  useEffect(async () => {
    await axios
      .get("https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature")
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const togglePopup = () => {
    setShow(!show);
  };

  const getData = () => {
    axios
      .get("https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature")
      .then((getData) => {
        setApiData(getData.data);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveData = () => {
    axios.post(
      "https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature",
      dataValue
    );
    // console.log(dataValue.comment);
  };
  return (
    <>
      <div className="Container">
        <div>
          <div className="heading">
            <div className="title2">COMMENT</div>
            <button type="submit" className="btnSubmit" onClick={togglePopup}>
              ADD COMMENT
            </button>
          </div>
        </div>

        <div className="displayComment">
          <ul>
            {apiData.map((data) => {
              return <h1>{data.comment}</h1>;
            })}
          </ul>
        </div>
        {show && (
          <div className="modal">
            <div className="overlay"></div>

            <form className="form">
              <div className="pageTitle title">
                <span>ADD COMMENT HERE...</span>
                <AiFillCloseSquare
                  className="closeSquare"
                  onClick={togglePopup}
                />
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
                  saveData();
                  togglePopup();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
