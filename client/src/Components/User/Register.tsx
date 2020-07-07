import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";

function Register() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    document.title = "회원가입 | MyChart";
    return () => {};
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleRegister = async () => {
    await axios
      .post("/api/user/register", form)
      .then((res: AxiosResponse<any>) => {
        alert(res.data);
      });
  };

  return (
    <div className="container">
      <form
        className="form_register"
        id="form_register"
        onSubmit={handleRegister}
      >
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
        <input
          type="submit"
          value="확인"
          className="form_register_button"
        ></input>
      </form>
    </div>
  );
}

export default Register;