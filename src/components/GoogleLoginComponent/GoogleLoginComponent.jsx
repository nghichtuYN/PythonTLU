import { GoogleLogin } from "@react-oauth/google";
import React, { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "../../services/userAPI";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { ContextSiteLayout } from "../../layouts/SiteLayout/SiteLayout";
import "./style.css"; // Import file CSS

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const { setToaster } = useContext(ContextSiteLayout);

  const onSuccessLogin = (data) => {
    localStorage.setItem("access_token", data?.data.access);
    localStorage.setItem("refresh_token", data?.data.refresh);
    setToaster({
      type: "success",
      message: "Đăng nhập thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
    navigate("/home");
  };
  const ggLogin = async (data) => {
    try {
      const res = await googleLogin(data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const ggLoginMutation = useMutationHook(
    (data) => ggLogin(data),
    (data) => onSuccessLogin(data)
  );
  const onSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(credentialResponse)
    const { email, family_name, given_name } = decoded;
    await ggLoginMutation.mutateAsync({
      email,
      first_name: given_name,
      last_name: family_name,
      password: "1",
    });
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
        onError={() => {
          console.log("Login Failed");
        }}
        className="custom-google-login"
      />
    </div>
  );
};

export default GoogleLoginComponent;
