import React from "react";
import menvideo from "../../assets/video/menvideo.webm";
import womenvideo from "../../assets/video/womenvideo.webm";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import newin from "../../assets/images/newin.jpg";
import accessories from "../../assets/images/accessories.jpg";
import clothing from "../../assets/images/clothing.jpg";
import shoes from "../../assets/images/shoes.jpg";
import topman from "../../assets/images/topman.jpg";
import normal from "../../assets/images/normal.jpg";
import adidas from "../../assets/images/adidaspng.png";
import tnf from "../../assets/images/tnfpng.png";
import ck from "../../assets/images/ck.png";
import nike from "../../assets/images/nike.png";
import { useParams } from "react-router-dom";
export const HomePage = () => {
  const {gender}=useParams()
  console.log(gender)
  return (
    <>
      <section
        className="container"
        style={{ height: "530px", width: "1260px", position: "relative" }}
      >
        <video
          style={{ padding: 0, margin: 0 }}
          loop="true"
          autoplay="autoplay"
          controls
          muted
          width="100%"
          height="100%"
          type="video/webm"
          src={gender ==="men" ? menvideo : womenvideo}
        ></video>
        <div
          style={{
            position: "absolute",
            bottom: "50%",
            left: "10%",
            top: "50%",
            textAlign: "start",
          }}
        >
          <h5>HÀNG MỚI VỀ</h5>
          <h1>
            <span>GIÁ TỐT NHẤT</span> TRONG MÙA NÀY
          </h1>
          <p>
            SOAS store cung cấp những sản phẩm tốt nhất với giá cả phải chăng
            nhất
          </p>
          <Button
            size="lg"
            variant="outline-dark"
            className="shopsnow-btn"
            style={{ textTransform: "uppercase" }}
          >
            Mua ngay
          </Button>
        </div>
      </section>
      <section className="container" style={{ marginTop: "50px" }}>
        <Row>
          <Col md={3}>
            <Card style={{ width: "300px", border: "none" }}>
              <Card.Img
                variant="top"
                src={newin}
                style={{ width: "100%", height: "380px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Sản phẩm mới
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "27px",
                  }}
                >
                  Sản phẩm mới giảm giá 30%.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: "300px", border: "none" }}>
              <Card.Img
                variant="top"
                src={accessories}
                style={{ width: "100%", height: "380px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Phụ kiện
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "27px",
                  }}
                >
                  Mẫu mã đa dạng, nhiều lựa chọn
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: "300px", border: "none" }}>
              <Card.Img
                variant="top"
                src={shoes}
                style={{ width: "100%", height: "380px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Giày
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "27px",
                  }}
                >
                  Đa dạng thương hiệu
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ width: "300px", border: "none" }}>
              <Card.Img
                variant="top"
                src={clothing}
                style={{ width: "100%", height: "380px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Quần áo
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "27px",
                  }}
                >
                  Phong cách, cá tính
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section
        className="container-4"
        style={{
          marginTop: "120px",
          paddingLeft: "120px",
          paddingRight: "120px",
        }}
      >
        <Row>
          <Col>
            <Card style={{ width: "500px", border: "none" }}>
              <Card.Img
                variant="top"
                src={topman}
                style={{ width: "100%", height: "640px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Đứng đầu
                </Card.Title>
                <Card.Text>Đứng đầu mua sắm</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "500px", border: "none" }}>
              <Card.Img
                variant="top"
                src={normal}
                style={{ width: "100%", height: "640px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Basic
                </Card.Title>
                <Card.Text>Phong cách đơn giản phù hợp.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
      <section className="container pt-3 pb-3">
        <Row>
          <div className="text center">
            <h2 className="fw-bolder">Thương hiệu</h2>
          </div>
        </Row>
        <Row>
          <Col md={3}>
            <Image
              style={{ width: "300px", height: "250px" }}
              src={adidas}
              alt="thương hiệu"
            />
          </Col>
          <Col md={3}>
            <Image
              style={{ width: "300px", height: "250px" }}
              src={tnf}
              alt="thương hiệu"
            />
          </Col>
          <Col md={3}>
            <Image
              style={{ width: "300px", height: "250px" }}
              src={ck}
              alt="thương hiệu"
            />
          </Col>
          <Col md={3}>
            <Image
              style={{ width: "300px", height: "250px" }}
              src={nike}
              alt="thương hiệu"
            />
          </Col>
        </Row>
      </section>
    </>
  );
};
