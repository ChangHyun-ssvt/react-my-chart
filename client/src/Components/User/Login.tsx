import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
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
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    if (form.userid === "") {
      alert("아이디를 입력해주세요");
      return false;
    }
    if (form.password === "") {
      alert("패스워드를 입력해주세요");
      return false;
    }
    postLogin();
  };

  const postLogin = async () => {
    await axios
      .post("/api/user/login", qs.stringify({ ...form }))
      .then((res: AxiosResponse<any>) => {
        alert(res.data);
      });
  };

  return (
    <div className="container">
      <form className="form_register" onSubmit={handleLogin}>
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
