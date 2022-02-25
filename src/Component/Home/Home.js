import React, { useEffect, useState } from "react";
import "./Home.css";
import { AiFillCloseSquare } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFillReplyFill } from "react-icons/bs";

import axios from "axios";
import DeleteConfirmation from "../DeleteConfirmation";
import UpdateComment from "../UpdateComment";

export default function Home() {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [popUp, setPopUp] = useState(false);
  const [editId, setEditId] = useState();
  const [dataValue, setDataValue] = useState({
    comment: "",
  });

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
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
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const onEdit = (id) => {
    setEditId(id);
    setPopUp(true);
    console.log(id);
  };
  const callParentFunction = () => {
    setPopUp(!popUp);
  };
  const onDelete = (id) => {
    handleDialog("Are you want to sure Delete?", true);
    setDeleteId(id);
  };
  const sureDelete = (choose, id) => {
    if (choose) {
      axios
        .delete(
          `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${id}`
        )
        .then(() => {
          getData();
        });
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const saveData = () => {
    axios.post(
      "https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature",
      dataValue
    );
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
              return (
                <li className="text">
                  <div className="text"> {data.comment}</div>
                  <div className="icons">
                    <FcLikePlaceholder className="subIconsLike" size={20} />
                    <BsFillReplyFill className="subIcons" size={20} />
                    <BiEdit
                      className="subIconsEdit"
                      size={20}
                      onClick={() => onEdit(data)}
                    />
                    <RiDeleteBin5Fill
                      className="subIconsDelete"
                      size={20}
                      onClick={() => onDelete(data.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {dialog.isLoading && (
          <DeleteConfirmation
            onDialog={sureDelete}
            id={deleteId}
            message={dialog.message}
          />
        )}
        {popUp ? (
          <UpdateComment data={editId} popUp={setPopUp} getData />
        ) : null}
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
