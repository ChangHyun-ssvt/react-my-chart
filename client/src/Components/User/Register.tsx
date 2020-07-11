import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "querystring";

function Register() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    passwordCheck: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    document.title = "회원가입 | MyChart";
    return () => {};
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (
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
    if (form.passwordCheck === "") {
      alert("패스워드 확인란을 입력해주세요");
      return false;
    }
    if (form.username === "") {
      alert("이름을 입력해주세요");
      return false;
    }
    if (form.email === "") {
      alert("이메일을 입력해주세요");
      return false;
    }
    if (form.password !== form.passwordCheck) {
      alert("패스워드를 확인해주세요");
      return false;
    }
    await postRegister();
  };

  const postRegister = async () => {
    try {
      await axios.post("/api/user/register", qs.stringify({ ...form }));
      alert("회원가입 성공");
      window.location.href = "/";
    } catch {
      alert("회원 가입이 실패했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="form_register" id="form_register">
        <p>아이디</p>
        <input
          type="text"
          className="form_register_text"
          name="userid"
          onChange={handleOnChange}
          value={form.userid}
        ></input>
        <p>패스워드</p>
        <input
          type="password"
          className="form_register_text"
          name="password"
          onChange={handleOnChange}
          value={form.password}
        ></input>
        <p>패스워드 확인</p>
        <input
          type="password"
          name="passwordCheck"
          onChange={handleOnChange}
          className="form_register_text"
        ></input>
        <p>이름</p>
        <input
          type="text"
          className="form_register_text"
          name="username"
          onChange={handleOnChange}
          value={form.username}
        ></input>
        <p>이메일</p>
        <input
          type="text"
          className="form_register_text"
          name="email"
          onChange={handleOnChange}
          value={form.email}
        ></input>
        <br></br>
        <button
          type="submit"
          className="form_register_button"
          onClick={handleRegister}
        >
          가입
        </button>
      </div>
    </div>
  );
}

export default Register;
