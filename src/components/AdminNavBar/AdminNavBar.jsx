import React from "react";
import {
  Col,
  Collapse,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import {
  RiMenuFold3FillIcon,
  RiMenuFold4FillIcon,
} from "../IconComponent/IconComponent";
import "./style.css";
import { AdninSearchComponent } from "../AdminSearchComponent/AdminSearchComponent";
import { BiSolidUserDetail } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
export default function AdminNavBar({ toggle, Toggle }) {
  return (
    <Navbar
      expand="lg"
      className="bg-white w-100 border-bottom 0"
      style={{ padding: 0, height: "80px" }}
    >
      <Container
        fluid
        style={{
          padding: 0,
          margin: 0,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
        }}
        as={Row}
      >
        <Collapse in={toggle} dimension="width">
          <Navbar.Brand
            as={Col}
            md="2 "
            className="text-center h-100"
            href="#"
            style={{ backgroundColor: "#2d2d2d", padding: 0, margin: 0 }}
          >
            <p style={{ width: "100%" }}>ASOS</p>
          </Navbar.Brand>
        </Collapse>
        <Nav
          as={Col}
          className={`ps-2 w-100 ${toggle ? "ms-2" : "ms-0"}`}
          style={{ transition: "margin-left 0.3s ease" }}
        >
          <Row className="w-100">
            <Col
              md={4}
              className="d-flex justify-content-start align-items-center gap-2"
            >
              {toggle ? (
                <RiMenuFold3FillIcon
                  className={`icon-toggle ${
                    toggle ? "icon-toggle-rotate" : ""
                  }`}
                  Toggle={Toggle}
                />
              ) : (
                <RiMenuFold4FillIcon Toggle={Toggle} />
              )}
              <AdninSearchComponent placeholder="Tìm kiếm...." />
            </Col>
            <Col
              md={8}
              className="d-flex justify-content-end align-items-center"
            >
              <Dropdown className="me-5">
                <Dropdown.Toggle
                  variant="seccondary"
                  style={{ border: "none" }}
                  id="dropdown-basic"
                >
                  <Image
                    src="holder.js/171x180"
                    roundedCircle
                    className="me-2"
                  />
                  Admin
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <BiSolidUserDetail size={20} className="me-2" />
                    Thông tin chi tiết
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <IoMdLogOut className="me-2" size={20} color="red" />
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Nav>
      </Container>
    </Navbar>
  );
}
