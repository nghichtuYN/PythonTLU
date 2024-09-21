import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextSiteLayout } from "../../layouts/SiteLayout/SiteLayout";
import { getDetail, login } from "../../services/userAPI";
import { useMutationHook } from "../../hooks/useMutationHook";
import { BsCheck2Circle } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
import GoogleLoginComponent from "../../GoogleLoginComponent/GoogleLoginComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/User/UserSlice";
function LoginPage() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setToaster } = useContext(ContextSiteLayout);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const loginUser = async (data) => {
    try {
      const res = await login(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  
  const onSuccess = (data) => {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    if (data?.access) {
      const decoded = jwtDecode(data?.access);
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, data?.access);
      }
    }
    setToaster({
      type: "success",
      message: "Đăng nhập thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
    navigate("/home");
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetail(id, token);
    dispatch(updateUser({ ...res  , access_token: token }));
  };

  const onError = () => {
    setToaster({
      type: "danger",
      message: "Đăng nhập thất bại🚀",
      show: true,
      icon: <CiNoWaitingSign size={40} color="white" />,
    });
  };
  const mutaionLogin = useMutationHook(
    (data) => loginUser(data),
    (data) => onSuccess(data),
    onError
  );
  const handleLogin = () => {
    mutaionLogin.mutate({ email, password });
  };
  const hasChanges = email !== "" && password !== "";
  return (
    <div className="sign-container w-100">
      <Container
        style={{
          padding: 0,
          margin: 0,
          display: "block",
          backgroundColor: "#ffffff",
        }}
      >
        <Row style={{ height: "90px" }}>
          <Col
            className={`fs-5 fw-bolder ${
              location.pathname === "/register"
                ? "border-bottom border-primary"
                : ""
            }  d-flex justify-content-center align-items-end register`}
            style={{
              cursor: "pointer",
              ...(location.pathname === "/register"
                ? { color: "black" }
                : { color: "#807a76" }),
            }}
          >
            <p onClick={() => navigate("/register")}>Đăng ký</p>
          </Col>
          <Col
            className={`fs-5 fw-bolder ${
              location.pathname === "/login"
                ? "border-bottom border-primary"
                : ""
            }  d-flex justify-content-center align-items-end`}
            style={{
              cursor: "pointer",
              ...(location.pathname === "/login"
                ? { color: "black" }
                : { color: "#807a76" }),
            }}
          >
            <p onClick={() => navigate("/login")}>Đăng nhập</p>
          </Col>
        </Row>
        <Row style={{ padding: "30px 120px" }}>
          <Form as={Container}>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>EMAIL</p>
              <Form.Control
                id="form-input-email"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <Form.Label style={{ fontWeight: "bolder", color: "#807a76" }}>
                MẬT KHẨU
              </Form.Label>
              <Form.Control
                id="form-input-password"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={handleLogin}
              disabled={!hasChanges}
              style={{ borderRadius: 0, width: "100%", fontWeight: "bolder" }}
            >
              ĐĂNG NHẬP
            </Button>
          </Form>
          <div className="mt-3">Quên mật khẩu ?</div>
        </Row>

        <Row className="pb-2">
          <div
            className="w-100"
            style={{
              height: "90px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5 style={{ fontWeight: "bolder" }}>HOẶC ĐĂNG NHẬP VỚI... </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <GoogleLoginComponent />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
