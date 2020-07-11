import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "querystring";

function Login() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
  });

  useEffect(() => {
    document.title = "로그인 | MyChart";
    return () => {};
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (form.userid === "") {
      alert("아이디를 입력해주세요");
      return false;
    }
    if (form.password === "") {
      alert("패스워드를 입력해주세요");
      return false;
    }
    await postLogin();
  };

  const postLogin = async () => {
    try {
      await axios.post("/api/user/login", qs.stringify({ ...form }));
      alert("로그인 성공");
      window.location.href = "/";
    } catch {
      alert("회원 정보가 틀렸습니다");
    }
  };

  return (
    <div className="container">
      <div className="form_register">
        <p>아이디</p>
        <input
          type="text"
          name="userid"
          className="form_register_text"
          onChange={handleOnChange}
          value={form.userid}
        ></input>
        <p>패스워드</p>
        <input
          type="password"
          name="password"
          className="form_register_text"
          onChange={handleOnChange}
          value={form.password}
        ></input>
        <button
          type="submit"
          className="form_register_button"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
