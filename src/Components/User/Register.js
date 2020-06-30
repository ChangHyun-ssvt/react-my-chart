import React from "react";

function register() {
  return (
    <div className="container">
      <form className="form_register">
        <p>아이디</p>
        <input type="text" className="form_register_text"></input>
        <p>패스워드</p>
        <input type="password" className="form_register_text"></input>
        <p>패스워드 확인</p>
        <input type="password" className="form_register_text"></input>
        <p>이름</p>
        <input type="password" className="form_register_text"></input>
        <br></br>
        <input
          type="button"
          value="확인"
          className="form_register_button"
        ></input>
      </form>
    </div>
  );
}

export default register;
