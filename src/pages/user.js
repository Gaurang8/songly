import React, { useState ,useContext } from "react";
import { useNavigate , Link } from "react-router-dom";
import { MyContext } from "../myContext";
import logo from "../logo.png";
import "./user.css";


function User() {
  const {setIsAuth, setUser } = useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmitReg = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    try {
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setIsAuth(true)
        setUser(result.user)
        setName("");
        setPassword("");
        setEmail("");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Enter Correct Input");
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const newUser = { email, password };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    try {
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setIsAuth(true)
        setUser(result.user)
        console.log(document.cookie);
        setName("");
        setPassword("");
        setEmail("");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Enter Correct Input");
    }
  };
  return (
    <div className="user_login">
      <Link to="/"><div className="login-top-logo">
        <img src={logo} alt="logo" height={"100%"} />
        <h2>Musicly {`${process.env.REACT_APP_BACKEND_ADDR}`}</h2>
      </div></Link>
      {isLogin ? (
        <div className="login-form">
          <div className="form-logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="form-header-text">Login</h2>
          <form method="post" onSubmit={handleSubmitLogin}>
            <div className="input-data">
              <div className="form-input">
                <input
                  type="email"
                  className="_input-field"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  className="_input-field"
                  id="pass"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="pass" className="input-label">
                  password
                </label>
              </div>
              {error && (
                <div className="error-message" style={{ color: "white" }}>
                  {error}
                </div>
              )}
              <input type="submit" value="Submit" className="form-submit-btn" />
              <div className="toggle-text"> New User ?  <Link onClick={()=>{setIsLogin(false)}}> Sign Up</Link></div>
            </div>
          </form>
        </div>
      ) : (
        <div className="login-form">
          <div className="form-logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="form-header-text">Register</h2>
          <form method="post" onSubmit={handleSubmitReg}>
            <div className="input-data">
              <div className="form-input">
                <input
                  type="text"
                  className="_input-field"
                  id="fname"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div htmlFor="fname" className="input-label">
                  Name
                </div>
              </div>

              <div className="form-input">
                <input
                  type="email"
                  className="_input-field"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
              </div>
              <div className="form-input">
                <input
                  type="text"
                  className="_input-field"
                  id="pass"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="pass" className="input-label">
                  password
                </label>
              </div>
              {error && (
                <div className="error-message" style={{ color: "white" }}>
                  {error}
                </div>
              )}
              <input type="submit" value="Submit" className="form-submit-btn" />
              <div>Already have an account?<Link onClick={()=>{setIsLogin(true)}}> Sign In</Link></div>

            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default User;
