import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { register } from "../../services/userAPI";
import { useMutationHook } from "../../hooks/useMutationHook";
import { BsCheck2Circle } from "react-icons/bs";
import { ContextSiteLayout } from "../../layouts/SiteLayout/SiteLayout";
import { CiNoWaitingSign } from "react-icons/ci";
import GoogleLoginComponent from "../../components/GoogleLoginComponent/GoogleLoginComponent";
const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFitstName] = useState("");
  const [last_name, setLasstName] = useState("");
  const { setToaster } = useContext(ContextSiteLayout);

  const hasChanges =
    first_name !== "" && last_name !== "" && email !== "" && password !== "";
  const registerUser = async (data) => {
    try {
      const res = await register(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  const onSuccess = () => {
    setToaster({
      type: "success",
      message: "Đăng ký thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
    navigate("/home");
  };
  const onError = () => {
    setToaster({
      type: "danger",
      message: "Đăng ký thất bại🚀",
      show: true,
      icon: <CiNoWaitingSign size={40} color="white" />,
    });
  };
  const registerMutation = useMutationHook(
    (data) => registerUser(data),
    onSuccess,
    onError
  );
  const handleSubmit = () => {
    if (confirmPassword === password)
      registerMutation.mutate({ first_name, last_name, password, email });
  };
  return (
    <div className="sign-container w-100 ">
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
        <Row className="pt-5">
          <div
            className="w-100"
            style={{
              height: "90px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5 style={{ fontWeight: "bolder" }}>ĐĂNG KÝ BẰNG... </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <GoogleLoginComponent />
          </div>
        </Row>
        <Row style={{ padding: "30px 120px" }}>
          <div
            className="w-100"
            style={{
              height: "90px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5 style={{ fontWeight: "bolder" }}>HOẶC ĐĂNG KÝ VỚI EMAIL </h5>
          </div>
          <Form as={Container}>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>EMAIL:</p>
              <Form.Control
                id="form-input-email"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>HỌ:</p>
              <Form.Control
                id="form-input-last-name"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="text"
                placeholder="Nhập họ"
                value={last_name}
                onChange={(e) => setLasstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>TÊN:</p>
              <Form.Control
                id="form-input-first_name"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="text"
                placeholder="Nhập tên"
                value={first_name}
                onChange={(e) => setFitstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>
                {" "}
                MẬT KHẨU:
              </p>
              <Form.Control
                id="form-input-password"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                value={password}
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>
                XÁC NHẬN MẬT KHẨU:
              </p>
              <Form.Control
                id="form-input--confirm-password"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>
            <Button
              disabled={!hasChanges}
              style={{ borderRadius: 0, width: "100%", fontWeight: "bolder" }}
              onClick={handleSubmit}
              type="submit"
            >
              ĐĂNG KÝ
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
