import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  ListGroup,
} from "react-bootstrap";
import "./style.css";
import { getAllProductParentCategoriesAPI } from "../../services/productCategory";
import { useQueryHook } from "../../hooks/useQueryHook";
import logo from "../../assets/images/menhomeimg.jpg";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import {
  OffcanvasNavBar,
  OffcanvasSearch,
} from "../OffcanvasComponent/OffcanvasComponent";
import {
  FaRegUserIcon,
  GoSearchIcon,
  HiOutlineShoppingBagIcon,
} from "../IconComponent/IconComponent";
import CategoryComponent from "../CategoryComponent/CategoryComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/User/UserSlice";
import { useDebounce } from "@uidotdev/usehooks";
import { getALLProductItemsSearchAPI } from "../../services/productItems";
import { SearchResultsComponent } from "../SearchResultsComponent/SearchResultsComponent";

const HeaderComponent = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);

  const placeholder = "Tìm kiếm các mặt hàng và thương hiệu";
  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("NAM");
  const [showSearch, setShowSearch] = useState(false);
  const [genderId, setGenderId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);
  const navigate = useNavigate();
  const handleToggleSearch = () => {
    handleShowSearch();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getProductItemBySearch = async (search) => {
    const res = await getALLProductItemsSearchAPI(search);
    return res.data;
  };
  const { data: searchResult } = useQueryHook(
    ["searchResults", debouncedSearchTerm],
    () => getProductItemBySearch(debouncedSearchTerm),
    {
      enabled: !!debouncedSearchTerm,
    }
  );
  console.log(searchResult);
  const handleLogout = async () => {
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
  const getAllProductCategory = async () => {
    const res = await getAllProductParentCategoriesAPI();
    return res.data;
  };

  const { data: parent_categories } = useQueryHook(
    ["parent_categories"],
    getAllProductCategory
  );
  useEffect(() => {
    if (parent_categories?.length) {
      const defaultGender = parent_categories[0];
      setGenderId(defaultGender?.id);
      setSelectedTab(defaultGender?.category_name || "NAM");
    }
  }, [parent_categories]);

  const handleGenderClick = useCallback((category) => {
    setGenderId(category.id);
    setSelectedTab(category.category_name);
    navigate(`/${category.category_name === "NAM" ? "men" : "women"}`);
  }, []);

  const memoizedProductGender = useMemo(() => {
    return parent_categories || [];
  }, [parent_categories]);

  const memoizedCategory = useMemo(() => {
    const child_categories = parent_categories?.find(
      (category) => category.id === genderId
    )?.child_categories;
    return child_categories || [];
  }, [genderId, parent_categories]);

  return (
    <div>
      <Navbar
        expanded={false}
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#2d2d2d", padding: 0 }}
      >
        <Container
          style={{ height: "60px", width: "100%" }}
          className="d-flex align-items-center"
        >
          <Row
            style={{ height: "100%", width: "100%" }}
            className="d-flex align-items-center"
          >
            <Col
              xs={4}
              sm={4}
              lg={1}
              md={3}
              xl={1}
              xxl={1}
              className="d-flex justify-content-start align-items-center pb-2"
            >
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={handleShow}
                variant="light"
              />
              <Navbar.Brand className="text-white fw-bolder ms-2" href="#">
                ASOS
              </Navbar.Brand>
            </Col>
            <Col
              xs={1}
              sm={1}
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              className="d-none d-lg-flex align-items-center"
            >
              <Navbar.Collapse id="basic-navbar-nav" className="text-white">
                <Row className="d-flex justify-content-start align-items-center w-100">
                  <Nav className="me-auto">
                    {memoizedProductGender.map((category) => {
                      const isActive = category.category_name === selectedTab;
                      return (
                        <Nav.Link
                          className="parent-category text-white fw-bolder text-center pt-3 pb-3"
                          key={category.id}
                          href="#"
                          onClick={() => handleGenderClick(category)}
                          style={{
                            backgroundColor: isActive ? "#525050" : "#2d2d2d",
                            width: "95px",
                            height: "60px",
                            fontSize: "15px",
                            padding: " 5px 0",
                          }}
                        >
                          {category.category_name}
                        </Nav.Link>
                      );
                    })}
                  </Nav>
                </Row>
              </Navbar.Collapse>
            </Col>
            <Col
              md={7}
              lg={7}
              xl={7}
              xxl={7}
              className="d-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex pb-2 pt-2"
            >
              <SearchComponent
                value={search}
                onChange={handleChange}
                placeholder={placeholder}
              />
              {/* {searchResult ? <SearchResultsComponent searchResult={{/> : null} */}
            </Col>
            <Col
              xs={8}
              sm={8}
              md={2}
              lg={2}
              xl={2}
              xxl={2}
              className="d-flex justify-content-end align-items-center d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex pb-2 "
            >
              <Nav>
                <div className="d-flex justify-content-end align-items-center gap-3">
                  <Nav.Link
                    onClick={handleToggleSearch}
                    className="d-lg-none d-md-none d-xl-none d-xxl-none d-xs-flex d-sm-flex"
                  >
                    <GoSearchIcon />
                  </Nav.Link>
                  <Nav.Link>
                    <OverlayTrigger
                      trigger="click"
                      key={"bottom"}
                      placement={"bottom"}
                      overlay={
                        <Popover id={`popover-positioned-bottom`}>
                          <Popover.Header as="h3">
                            {!user?.id ? (
                              <div className="d-flex justify-content-start align-items-center">
                                <div
                                  className="me-2"
                                  onClick={() => navigate("/login")}
                                  style={{ cursor: "pointer" }}
                                >
                                  Đăng nhập
                                </div>
                                {" | "}
                                <div
                                  className="ms-2"
                                  onClick={() => navigate("/register")}
                                  style={{ cursor: "pointer" }}
                                >
                                  Đăng ký
                                </div>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-start align-items-center">
                                {`${user?.first_name} ${user?.last_name} | `}
                                <div
                                  onClick={handleLogout}
                                  style={{ cursor: "pointer", color: "red" }}
                                >
                                  Đăng xuất
                                </div>
                              </div>
                            )}
                          </Popover.Header>
                          <Popover.Body className="w-100">
                            <ListGroup
                              className="w-100"
                              style={{ padding: 0 }}
                              variant="flush"
                            >
                              <ListGroup.Item
                                onClick={() =>
                                  navigate(`/user/${user?.id}/order`)
                                }
                              >
                                Đơn hàng
                              </ListGroup.Item>
                            </ListGroup>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button
                        className="btn-user"
                        size="sm"
                        variant="outline-dark"
                      >
                        <FaRegUserIcon />
                      </Button>
                    </OverlayTrigger>
                  </Nav.Link>
                  {/* <Nav.Link>
                    <FaRegHeartIcon />
                  </Nav.Link> */}
                  <Nav.Link>
                    <Button
                      variant="outline-dark"
                      className="position-relative"
                      size="sm"
                      onClick={() => navigate("/cart")}
                    >
                      <HiOutlineShoppingBagIcon />
                      {order?.orderItems.length > 0 && (
                        <span class="position-absolute top-30 start-100 translate-middle badge rounded-pill bg-danger">
                          {order?.orderItems?.length === 0
                            ? 0
                            : order?.orderItems?.length}
                        </span>
                      )}
                    </Button>
                  </Nav.Link>
                </div>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <CategoryComponent memoizedCategory={memoizedCategory} />
      <Container fluid style={{ padding: 0 }}>
        <Row
          style={{ margin: 0, padding: 0 }}
          className="d-none d-md-flex w-100"
        >
          <Col
            style={{ backgroundColor: "#9cf0e0", lineHeight: "50px" }}
            className="fs-md-1 fs-lg-1 fs-xl-2 fs-xxl-3 fw-bolder text-center"
            md={6}
            lg={6}
            xl={6}
            xxl={6}
          >
            Giảm giá tới 30% các sản phẩm mới
          </Col>
          <Col
            style={{ backgroundColor: "#000000", lineHeight: "50px" }}
            className="fs-md-2 fs-lg-2 fs-xl-2 fs-xxl-3 text-white fw-bolder text-center"
            md={6}
            lg={6}
            xl={6}
            xxl={6}
          >
            Miễn phí vận chuyển toàn quốc
          </Col>
        </Row>
      </Container>
      <OffcanvasNavBar
        show={show}
        handleClose={handleClose}
        memoizedProductGender={memoizedProductGender}
        selectedTab={selectedTab}
        handleGenderClick={handleGenderClick}
        memoizedCategory={memoizedCategory}
        logo={logo}
      />

      <OffcanvasSearch
        showSearch={showSearch}
        handleCloseSearch={handleCloseSearch}
        handleClose={handleClose}
        placeholder={placeholder}
      />
    </div>
  );
};

export default HeaderComponent;
