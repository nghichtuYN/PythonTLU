import React, { createContext, useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import logo from "../../assets/images/ASOS.png";
import { ToasterComponent } from "../../components/ToasterComponent/ToasterComponent";
export const ContextSiteLayout = createContext("unknown");

const SiteLayout = ({ children }) => {
  const [toaster, setToaster] = useState({
    show: false,
    message: "",
    type: "",
    icon: null,
  });
  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);
  return (
    <ContextSiteLayout.Provider value={value}>
      <div
        className="d-flex justify-content-center align-items center"
        style={{ backgroundColor: "#eeeeee" }}
      >
        <div
          className="content w-100 d-flex flex-column justify-content-center align-items-center"
          style={{ minWidth: "540px", maxWidth: "720px" }}
        >
          <div
            style={{ height: "120px" }}
            className="d-flex justify-content-center align-items-end w-100"
          >
            <Image src={logo} alt="" style={{ height: "60px" }} />
          </div>
          <div
            style={{
              height: "140vh",
              width: "100%",
            }}
          >
            {children}
          </div>
        </div>
        <ToasterComponent
          message={toaster.message}
          type={toaster.type}
          showToast={toaster.show}
          onClose={() => setToaster({ ...toaster, show: false })}
          icon={toaster.icon}
        />
      </div>
    </ContextSiteLayout.Provider>
  );
};

export default SiteLayout;
