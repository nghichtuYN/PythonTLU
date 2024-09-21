import React from "react";
import "./style.css";

import { useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { RxDimensions } from "react-icons/rx";
import { Col, Row } from "react-bootstrap";
import { Shirt,Bookmark, Logs } from 'lucide-react';
export const MenuAdminComponent = () => {
  const option = useLocation();
  const navigate = useNavigate();
 
  return (
    <div
      className="flex-column"
      style={{ backgroundColor: "#2d2d2d", width: "100%" }}
    >
      <div>
        <p className="text-white text-start pt-3 ps-3" style={{width:'100px'}}>Quản lý</p>
      </div>
      <div>
        <ul className="list-group list-group-flush">
          <li
            onClick={() => navigate("/admin/dashboard/")}
            className={`list-group-item ${
              option.pathname === "/admin/dashboard/" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <LuLayoutDashboard size={25} />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Bảng điều khiển
              </Col>
            </Row>
          </li>

          <li
            onClick={() => {
              navigate(`/admin/category/`);
            }}
            className={`list-group-item ${
              option.pathname === "/admin/category/" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <MdOutlineCategory size={25} />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Danh mục
              </Col>
            </Row>
          </li>
          <li
            onClick={() => navigate("/admin/product/")}
            className={`list-group-item ${
              option.pathname === "/admin/product/" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <Shirt size={25} />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Sản phẩm
              </Col>
            </Row>
          </li>
          <li
            onClick={() => navigate("/admin/size_category/")}
            className={`list-group-item ${
              option.pathname === "/admin/size_category/" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <RxDimensions size={25}  />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Kích cỡ
              </Col>
            </Row>
          </li>
          <li
            onClick={() => navigate("/admin/size_category")}
            className={`list-group-item ${
              option.pathname === "/admin/size_category" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <Bookmark size={25}  />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Thương hiệu
              </Col>
            </Row>
          </li>
          <li
            onClick={() => navigate("/admin/orders/")}
            className={`list-group-item ${
              option.pathname === "/admin/orders/" ? "isactive" : ""
            }`}
          >
            <Row className="d-flex justify-content-center align-items-center w-100">
              <Col md={2}>
                <Logs size={25}  />
              </Col>
              <Col className="text-start ps-4" md={10}>
                Đơn hàng
              </Col>
            </Row>
          </li>
        </ul>
      </div>
    </div>
  );
};
