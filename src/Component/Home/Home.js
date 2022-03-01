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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Comment_reply from "./Comment_reply";
import UpdateComment_reply from "./UpdateComment_reply";

export default function Home() {
  const [show, setShow] = useState(false);
  const [replyShow, setReplyShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [popUp, setPopUp] = useState(false);
  const [replyPopUp, setReplyPopUp] = useState(false);
  const [editId, setEditId] = useState();
  const [like, setLike] = useState(false);
  const [dataReplyId, setDataReplyId] = useState("");
  const [dataReply, setDataReply] = useState({
    reply: "",
  });
  const [dataValue, setDataValue] = useState({
    comment: "",
    isLike: false,
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
  const onLike = (id) => {
    setDataValue(!dataValue.isLike);
    setDataValue((isLike) => ({ ...(isLike ? "class1" : "class2") }));
    console.log(dataValue.isLike);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(dataReply);
    setDataValue((prevState) => ({ ...prevState, [name]: value }));
    setDataReply((prevState) => ({ ...prevState, [name]: value }));
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
  };
  const onReplyEdit = (id) => {
    setEditId(id);
    setReplyPopUp(true);
  };

  const onReply = (id) => {
    setDataReplyId(id);
    console.log(id);
    setReplyShow(true);
  };

  const onDelete = (id) => {
    handleDialog("Are you want to sure Delete this Comment?", true);
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
  const saveReplyData = () => {
    axios.post(
      `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${dataReplyId}/Comment_reply`,
      dataReply
    );
    console.log(dataReply);
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
            {replyPopUp ? (
              <UpdateComment_reply data={editId} popUp={setReplyPopUp} />
            ) : null}
            {replyShow && (
              <div className="modal">
                <div className="overlay"></div>
                <form className="form">
                  <div className="pageTitle title">
                    <span>ADD REPLY COMMENT HERE...</span>
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
                      saveReplyData();
                      setReplyShow(false);
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {apiData.map((data, index) => {
              return (
                <li className="text" key={index}>
                  <div className="text"> {data.comment}</div>
                  <div className="icons">
                    {/* <FcLikePlaceholder
                      // className={
                      //   ("subIcons", "class2" + (like ? "class1" : ""))
                      // }
                      // {...(like ? "class1" : "class2")}
                      className="subIcons"
                      size={20}
                      onClick={() => onLike()}
                    /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          name="checkedH"
                        />
                      }
                    />
                    <BsFillReplyFill
                      className="subIcons"
                      size={20}
                      onClick={() => onReply(data.id)}
                    />
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
                  <Comment_reply
                    popUp={setReplyPopUp}
                    editId={setEditId}
                    data={data.id}
                  />
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
        {popUp ? <UpdateComment data={editId} popUp={setPopUp} /> : null}
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
