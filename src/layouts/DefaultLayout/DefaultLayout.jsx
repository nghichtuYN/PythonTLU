import React, { createContext, useMemo, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { FooterComponent } from "../../components/FooterComponent/FooterComponent";
import { Container } from "react-bootstrap";
import { ToasterComponent } from "../../components/ToasterComponent1/ToasterComponent";
// import { ToasterComponent } from "../../components/ToasterComponent/ToasterComponent cp[";
export const DefaultContext = createContext("unknown");

export const DefaultLayout = ({ children }) => {
  const [toaster, setToaster] = useState({
    show: false,
    message: "",
    type: "",
    icon: null,
  });
  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);
  return (
    <DefaultContext.Provider value={value}>
      <div className="defaultLayout">
        <header className="fixed-top">
          <HeaderComponent />
        </header>
        <Container
          fluid
          style={{ marginTop: "161px", height: "auto", marginBottom: "2px" }}
        >
          {children}
        </Container>
        <ToasterComponent
          message={toaster.message}
          type={toaster.type}
          showToast={toaster.show}
          onClose={() => setToaster({ ...toaster, show: false })}
          icon={toaster.icon}
        />
        <FooterComponent />
      </div>
    </DefaultContext.Provider>
  );
};
