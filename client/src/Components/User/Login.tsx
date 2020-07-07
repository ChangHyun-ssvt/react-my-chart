import React, { useEffect } from "react";

function Login() {
  useEffect(() => {
    document.title = "로그인 | MyChart";
    return () => {};
  }, []);

  return (
    <div className="container">
      <form className="form_register" action="/api/user/login" method="post">
        <p>아이디</p>
        <input type="text" name="userid" className="form_register_text"></input>
        <p>패스워드</p>
        <input
          type="password"
          name="password"
          className="form_register_text"
        ></input>
        <input
          type="submit"
          value="로그인"
          className="form_register_button"
        ></input>
      </form>
    </div>
  );
}

export default Login;
