import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

export default ({ history, isHome = false, type = "" }) => {

  useEffect(() => {
    if (type === "user")
      type = ""
    var acc = document.getElementsByClassName("menuIcon");
    acc[0].addEventListener("click", function () {
      var panel = this.nextElementSibling;
      if (panel.style.display == "flex") {
        panel.style.display = "none"
      } else {
        panel.style.display = "flex"
      }
    });
  }, [])

  return (
    <div className="topBar">
      {isHome ? (
        <h1>{"<HACKER POLL />"}</h1>
      ) : (
          <div className="icon" onClick={() => {
            history.goBack()
          }}>
            <IoMdArrowRoundBack />
          </div>
        )}
      {isHome ? (<></>) : (
        <div onClick={async () => history.push(`/${type}`)}>
          <h1 style={{ cursor: "pointer" }}>{"<HACKER POLL />"}</h1>
        </div>
      )}
      <div>
        <BsThreeDotsVertical className="menuIcon" />
        <div className="logOptions">
          <div onClick={async () => {
            await localStorage.removeItem("token");
            await localStorage.removeItem("type")
            history.push("/signin")
          }}>LogOut</div>
        </div>
      </div>
    </div>
  )
}