import React, { createContext, useMemo, useState } from "react";
import { Col, Collapse, Container } from "react-bootstrap";
import { MenuAdminComponent } from "../../components/MenuAdminComponent/MenuAdminComponent";
import "./style.css";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
import { ToasterComponent } from "../../components/ToasterComponent/ToasterComponent";
export const Context = createContext("unknown");

export const AdminLayout = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const [toaster, setToaster] = useState({
    show: false,
    message: "",
    type: "",
    icon: null,
  });
  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <Context.Provider value={value}>
      <div className="AdminLayout">
        <AdminNavBar toggle={toggle} Toggle={Toggle} className="fixed-navbar" />
        <Container fluid className="container-admin d-flex ">
          <Collapse in={toggle} dimension="width">
            <Col className="fixed-sidebar" md={2} lg={2} xl={2} xxl={2}>
              <MenuAdminComponent />
            </Col>
          </Collapse>
          <Col className="content-area">{children}</Col>
        </Container>
        <ToasterComponent
          message={toaster.message}
          type={toaster.type}
          showToast={toaster.show}
          onClose={() => setToaster({ ...toaster, show: false })}
          icon={toaster.icon}
        />
      </div>
    </Context.Provider>
  );
};
