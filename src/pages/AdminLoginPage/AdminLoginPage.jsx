import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextSiteLayout } from "../../layouts/SiteLayout/SiteLayout";
// import { getDetail, adminLogin } from "../../services/userAPI"; // Thay đổi tên hàm đăng nhập
import { useMutationHook } from "../../hooks/useMutationHook";
import { BsCheck2Circle } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/User/UserSlice";
import GoogleLoginComponent from "../../components/GoogleLoginComponent/GoogleLoginComponent";
import { getDetail, login } from "../../services/userAPI";

function AdminLoginPage() {
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

  const loginAdmin = async (data) => {
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
      if (decoded?.id && decoded?.is_admin) {
        handleGetDetailsUser(decoded?.id, data?.access);
        setToaster({
          type: "success",
          message: "Đăng nhập admin thành công🚀",
          show: true,
          icon: <BsCheck2Circle size={40} color="white" />,
        });
        navigate("/admin/dashboard");
      } else {
        setToaster({
          type: "danger",
          message: "Bạn không có quyền đăng nhập🚀",
          show: true,
          icon: <BsCheck2Circle size={40} color="white" />,
        });
      }
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetail(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
  };

  const onError = () => {
    setToaster({
      type: "danger",
      message:
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập🚀",
      show: true,
      icon: <CiNoWaitingSign size={40} color="white" />,
    });
  };

  const mutationLogin = useMutationHook(
    (data) => loginAdmin(data), // Gọi hàm đăng nhập admin
    (data) => onSuccess(data),
    onError
  );

  const handleLogin = () => {
    mutationLogin.mutate({ email, password });
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
            className={`fs-5 fw-bolder d-flex justify-content-center align-items-end`}
          >
            <p>Đăng nhập Admin</p>
          </Col>
        </Row>
        <Row style={{ padding: "30px 120px" }}>
          <Form as={Container}>
            <Form.Group className="mb-3 d-flex flex-column justify-content-start align-items-start">
              <p style={{ fontWeight: "bolder", color: "#807a76" }}>
                EMAIL ADMIN
              </p>
              <Form.Control
                id="form-input-email"
                style={{
                  borderRadius: "none",
                  height: "50px",
                  lineHeight: "50px",
                }}
                type="email"
                placeholder="Nhập email admin"
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
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="link" onClick={handleShowPassword}>
                {showPassword ? "Ẩn" : "Hiện"}
              </Button>
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
      </Container>
    </div>
  );
}

export default AdminLoginPage;
