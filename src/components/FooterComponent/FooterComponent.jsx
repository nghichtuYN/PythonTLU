import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./style.css";
import vietnam from "../../assets/images/viet-nam.png";
import fb from "../../assets/images/facebook.png";
import ig from "../../assets/images/instagram.png";
import visa from "../../assets/images/card.png";
import paypal from "../../assets/images/paypal.png";
import mb from '../../assets/images/mb.jpg';
import vcb from '../../assets/images/vcb.jpg';
import tcb from '../../assets/images/tcb.jpg';
import linkedin from '../../assets/images/linkedin.png';
import bidv from '../../assets/images/bidv.jpg';

export const FooterComponent = () => {
  return (
    <footer className="footer">
      <Container className="pb-3 d-none d-md-flex justify-content-center" style={{ backgroundColor: '#ffffff' }} fluid>
        <Row>
          <Col className="d-flex justify-content-end align-items-center gap-5">
            <Image className="image-item-social" src={fb} roundedCircle alt="" />
            <Image className="image-item-social" src={ig} roundedCircle alt="" />
            <Image className="image-item-social" src={linkedin} roundedCircle alt="" />
            {"|"}
          </Col>
          <Col className="d-flex justify-content-start align-items-center gap-4">
            <Image className="image-item" src={visa} alt="" />
            <Image className="image-item" src={paypal} alt="" />
            <Image className="image-item" src={mb} alt="" />
            <Image className="image-item" src={vcb} alt="" />
            <Image className="image-item" src={tcb} alt="" />
            <Image className="image-item" src={bidv} alt="" />
          </Col>
        </Row>
      </Container>
      <Container className="pt-2 d-none d-md-flex w-100">
        <Row className="footer-top text-start w-100">
          <Col md={4} lg={3} xl={3} xxl={3} className="d-flex flex-column">
            <p>TRỢ GIÚP & THÔNG TIN</p>
            <ul>
              <li>Trợ giúp</li>
              <li>Theo dõi đơn hàng</li>
              <li>Giao hàng & hoàn trả</li>
              <li>Sơ đồ trang</li>
            </ul>
          </Col>
          <Col md={4} lg={3} xl={3} xxl={3} className="d-flex flex-column">
            <p>VỀ ASOS</p>
            <ul>
              <li>Về chúng tôi</li>
              <li>Cơ hội nghề nghiệp tại ASOS</li>
              <li>Trách nhiệm doanh nghiệp</li>
              <li>Trang nhà đầu tư</li>
            </ul>
          </Col>
          <Col md={4} lg={3} xl={3} xxl={3} className="d-flex flex-column">
            <p>THÊM TỪ ASOS</p>
            <ul>
              <li>Ứng dụng di động và ASOS</li>
              <li>ASOS Marketplace</li>
              <li>Phiếu quà tặng</li>
              <li>Ngày hội mua sắm</li>
              <li>ASOS x Thrift+</li>
              <li>Khám phá thẻ tín dụng ASOS</li>
            </ul>
          </Col>
          <Col md={4} lg={3} xl={3} xxl={3} className="d-flex flex-column">
            <p>MUA SẮM TỪ:</p>
            <p className="d-flex justify-content-start align-items-center gap-1">
              Bạn đang ở <strong>Việt Nam</strong>
              <img src={vietnam} alt="logo" /> | <a href="#">THAY ĐỔI</a>
            </p>
          </Col>
        </Row>
      </Container>
      <Container style={{ padding: 0 }} fluid>
        <Row className="footer-bottom w-100">
          <Col className="text-start d-flex align-items-center">
            <p className="ps-4">&copy; 2024 ASOS</p>
          </Col>
          <Col className="text-end align-items-center">
            <ul className="footer-links">
              <li>
                <a href="">Quyền riêng tư & Cookies</a>
              </li>
              <li>
                <a>Các điều khoản & Điều kiện</a>
              </li>
              <li>
                <a className="d-none d-md-flex">Tiếp cận</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
