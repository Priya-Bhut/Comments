import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import axios from "axios";

export default function Comment_reply(props) {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [dataValue, setDataValue] = useState("");
  useEffect(async () => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(
        `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${props.data}/Comment_reply`
      )
      .then((getData) => {
        setApiData(getData.data);
      });
  };
  const onDelete = (id) => {
    window.confirm("Are you want to sure delete?");
    axios
      .delete(
        `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${props.data}/Comment_reply/${id}`
      )
      .then(() => {
        getData();
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataValue((prevState) => ({ ...prevState, [name]: value }));
  };
  const saveData = () => {
    axios.post(
      `https://62024b29b8735d00174cb98f.mockapi.io/Comment-Feature/${props.data}/Comment_reply`,
      dataValue
    );
  };

  const onEdit = (id) => {
    props.editId(id);
    console.log(id);
    props.popUp(true);
  };
  const togglePopup = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="displayComment">
        <ul>
          {apiData.map((data, index) => {
            return (
              <li className="text" key={index}>
                <div className="text"> {data.reply}</div>
                <div className="icons">
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
    </>
  );
}
