import React, { useState, useEffect } from "react";

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

  return (
    <div className="container">
      <form className="form_register">
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
