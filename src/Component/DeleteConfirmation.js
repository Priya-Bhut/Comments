import React from "react";

export default function DeleteConfirmation({ message, onDialog, id }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false, id)}
    >
      <div
        // onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#111", fontSize: "16px" }}>{message}</h3>

        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onDialog(true, id)}
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              marginRight: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            DELETE
          </button>
          <button
            onClick={() => onDialog(false, id)}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
