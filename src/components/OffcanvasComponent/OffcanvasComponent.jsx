import React from "react";
import {
  Nav,
  Form,
  FormControl,
  Button,
  Offcanvas,
  Card,
} from "react-bootstrap";
export const OffcanvasNavBar = (props) => {
  const {
    show,
    handleClose,
    memoizedProductGender,
    selectedTab,
    handleGenderClick,
    memoizedCategory,
    logo,
  } = props;
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          {memoizedProductGender.map((gender) => {
            const isActive = gender.gender_name === selectedTab;
            return (
              <Nav.Link
                key={gender.id}
                onClick={() => handleGenderClick(gender)}
                className="text-center fw-bolder fs-sm-1 fs-xs-1 fs-md-2"
                style={{
                  color: isActive ? "black" : "#C0C0C0",
                  borderBottom: isActive ? "solid 1px" : "none",
                  width: "50%",
                  height: "60px",
                  lineHeight: "60px",
                }}
              >
                {gender.gender_name}
              </Nav.Link>
            );
          })}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Card
              style={{ height: "50px", backgroundColor: "#eeeeee", borderRadius:0}}
              className="d-flex flex-row"

            >
              <Card.Body className="d-flex align-items-center p-3">
                <Card.Title>Trang chủ</Card.Title>
              </Card.Body>
              <Card.Img
                className="flex-shrink-0"
                src={logo}
                alt="image"
                style={{ width: "50px", height: "auto" }}
              />
            </Card>
            <Card
              style={{ backgroundColor: "#9cf0e0",borderRadius:0 }}
              className="d-flex flex-column"
            >
              <Card.Body className="d-block align-items-center p-3">
                <Card.Title className="fs-md-2">Up to 30% OFF</Card.Title>
                <Card.Text>Fresh Faves</Card.Text>
              </Card.Body>
            </Card>
            {memoizedCategory.map((category, index) => (
              <Card
                style={{ backgroundColor: "#eeeeee" ,borderRadius:0}}
                key={index}
                className="d-flex flex-row"
              >
                <Card.Body className="d-flex align-items-center p-3">
                  <Card.Title>{category.category_name}</Card.Title>
                </Card.Body>
                <Card.Img
                  className="flex-shrink-0"
                  src={logo}
                  alt="image"
                  style={{ width: "50px", height: "auto" }}
                />
              </Card>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export const OffcanvasSearch = (props) => {
  const { showSearch, handleCloseSearch, handleClose, placeholder } = props;
  return (
    <>
      <Offcanvas
        style={{ width: "100%" }}
        show={showSearch}
        onHide={handleCloseSearch}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <FormControl
              type="search"
              placeholder={placeholder}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" onClick={handleClose}>
              Search
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
