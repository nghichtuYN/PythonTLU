import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
  Table,
  Form,
} from "react-bootstrap";
import { TiDeleteOutline, TiPlus } from "react-icons/ti";
import "./style.css";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
// import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocation, useNavigate } from "react-router-dom";
// import { BsCheck2Circle } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CgSearchLoading } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { TbSearchOff } from "react-icons/tb";
import {
  deleteProducts,
  delteSingleProductAPI,
  getAllProductsAPI,
} from "../../services/products";
import { useQueryHook } from "../../hooks/useQueryHook";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import { getAllCategoriesNoPaninationAPI } from "../../services/productCategory";
import { getBrandsNoPaninationAPI } from "../../services/brands";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { getAllColourNoPaninationAPI } from "../../services/colour";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";

export const ContextProducts = createContext("unknown");

export default function ManageProduct() {
  const limit = 10;
  const isProduct = "isProduct";
  const placeholder = "Tìm kiếm...";
  const isAddProductItems = useRef(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";
  const [checkedItems, setCheckedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const handleClose = () => {
    if (isAddProductItems.current) isAddProductItems.current = false;
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const [showPopover, setShowPopover] = useState(false);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);

  const getAllProducts = async (page, search) => {
    const res = await getAllProductsAPI(page, search);
    return res.data;
  };

  const {
    data: products,
    refetch,
    isFetching,
  } = useQueryHook(["products", page, debouncedSearchTerm], () =>
    getAllProducts(page, debouncedSearchTerm)
  );

  const getAllProductCategoryNoPanination = async () => {
    const res = await getAllCategoriesNoPaninationAPI();
    return res.data;
  };
  const getAllBrandsNoPanination = async () => {
    const res = await getBrandsNoPaninationAPI();
    return res.data;
  };

  const getAllColourNoPanination = async () => {
    const res = await getAllColourNoPaninationAPI();
    return res.data;
  };
  const { data: allCategories } = useQueryHook(
    ["allCategories"],
    getAllProductCategoryNoPanination,
    { enabled: !!show }
  );
  const { data: allBrands } = useQueryHook(
    ["allBrands"],
    getAllBrandsNoPanination,
    { enabled: !!show }
  );

  const { data: allColours } = useQueryHook(
    ["allColours"],
    getAllColourNoPanination,
    { enabled: !!isAddProductItems.current }
  );

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const handleCancel = () => {
    setShowPopover(false);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCheckItem = (id) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const isChecked = (id) => checkedItems.includes(id);

  const handleCheckAll = () => {
    setCheckedItems(
      checkedItems.length === products?.results?.length
        ? []
        : products?.results?.map((product) => product?.id)
    );
  };

  const onSuccessDelete = () => {
    if (checkedItems?.length === products?.results?.length) {
      if (page !== "1") {
        if (searchValue !== "") {
          navigate(
            `/admin/product/?page=${page - 1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        } else navigate(`/admin/product/?page=${page - 1}`);
        setCheckedItems([]);
      } else {
        if (searchValue !== "")
          navigate(
            `/admin/product/?page=${1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        else navigate(`/admin/product/?page=${1}`);
        setCheckedItems([]);
      }
    }
    setCheckedItems([]);

    refetch();
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const onSuccessDeleteSingle = () => {
    if (products?.results?.length === 1) {
      if (page !== "1") {
        if (searchValue !== "") {
          navigate(
            `/admin/product/?page=${page - 1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        } else {
          navigate(`/admin/product/?page=${page - 1}`);
        }
      } else {
        if (searchValue !== "")
          navigate(
            `/admin/product/?page=${1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        else {
          navigate(`/admin/product/?page=${1}`);
        }
      }
    }
    refetch();
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };

  const mutaionDeleteSingleProduct = useMutationHook((data) => {
    const { id } = data;
    return delteSingleProductAPI(id);
  }, onSuccessDeleteSingle);

  const handleDeleteSingle = () => {
    mutaionDeleteSingleProduct.mutate({ id: currentPopoverId });
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    navigate(
      `/admin/product/?page=1&search=${encodeURIComponent(e.target.value)}`
    );
  };

  const mutationDeleteMany = useMutationHook(deleteProducts, onSuccessDelete);

  const handleDeleteMany = async () => {
    mutationDeleteMany.mutate({ products: checkedItems });
  };

  const popover = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Xóa tất cả mục đã chọn</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancel}>
          Hủy
        </Button>
        <Button
          size="sm"
          onClick={() => {
            handleDeleteMany();
            handleCancel();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );

  const popoverSingle = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Bạn có chắc chắn xóa ?</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancelSingle}>
          Hủy
        </Button>
        <Button
          size="sm"
          onClick={() => {
            handleCancelSingle();
            handleDeleteSingle();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const value = useMemo(
    () => ({
      isProduct,
      searchValue,
      isAddProductItems,
      allCategories,
      allBrands,
      product,
      allColours,
    }),
    [
      isProduct,
      product,
      searchValue,
      isAddProductItems,
      allCategories,
      allBrands,
      allColours,
    ]
  );
  return (
    <ContextProducts.Provider value={value}>
      <div
        className="manage-product-page"
        style={{ backgroundColor: "#f3f3f4", height: "120vh" }}
      >
        <Container className="ps-4 pe-4">
          <Row className="pt-4">
            <Col className="text-start ps-5 fw-bolder fs-5">
              Quản lý sản phẩm
            </Col>
            <Col className="text-end pe-5">
              <span className="fw-bolder">Sản phẩm </span>
              {">"} Quản lý sản phẩm
            </Col>
          </Row>
          <div className="mt-3" style={{ backgroundColor: "#ffffff" }}>
            <Row className="pt-4 mb-4">
              <Col className="d-flex justify-content-start gap-1 ms-5 align-items-center">
                <Button
                  className="add-btn"
                  size="md"
                  style={{ border: "none" }}
                  onClick={handleShow}
                >
                  <TiPlus />
                  Mới
                </Button>
                {checkedItems?.length > 0 && (
                  <OverlayTrigger
                    trigger="click"
                    placement={"top"}
                    overlay={popover}
                    show={showPopover}
                    onToggle={() => setShowPopover(!showPopover)}
                    rootClose={true}
                  >
                    <Button
                      className="del-btn"
                      variant="outline-dark"
                      size="md"
                      onClick={() => setShowPopover(!showPopover)}
                    >
                      <MdDeleteOutline />
                    </Button>
                  </OverlayTrigger>
                )}
              </Col>
              <Col className="d-flex justify-content-end me-5 align-items-center">
                <div className="input-wrapper-admin-search ">
                  <input
                    className="fs-md-2 fs-lg-3 fs-xxl-3 fs-xl-4"
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  {isFetching ? (
                    <>
                      <CgSearchLoading id="search-icon" size={25} />
                    </>
                  ) : searchValue ? (
                    <TiDeleteOutline
                      id="search-icon"
                      size={25}
                      as={Button}
                      onClick={() => setSearchValue("")}
                    />
                  ) : (
                    <FaSearch id="search-icon" />
                  )}
                </div>
              </Col>
            </Row>
            <Table responsive className="category-table">
              <thead>
                <tr style={{ backgroundColor: "grey" }}>
                  <th>
                    <Form.Check
                      onChange={handleCheckAll}
                      checked={
                        checkedItems.length === products?.results?.length
                      }
                    />
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Thương hiệu</th>
                  <th>Ngày tạo</th>
                  <th>Ngày cập nhật</th>
                  <th>Tùy chỉnh</th>
                </tr>
              </thead>
              <>
                <tbody>
                  {isFetching ? (
                    <SpinerComponent />
                  ) : (
                    products?.results?.length > 0 &&
                    products?.results?.map((product) => {
                      const created_date = new Date(product?.created);
                      const updated_date = new Date(product?.updated);
                      const formattedCreatedDate = created_date.toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );
                      const formattedUpdatedDate = updated_date.toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );
                      return (
                        <tr key={product?.id}>
                          <td>
                            <Form.Check
                              checked={isChecked(product?.id)}
                              onChange={() => handleCheckItem(product?.id)}
                            />
                          </td>
                          <td>{product?.product_name}</td>
                          <td>{product?.product_description}</td>
                          <td>{product?.product_category?.category_name}</td>
                          <td>{product?.brand?.brand_name}</td>
                          <td>{formattedCreatedDate}</td>
                          <td>{formattedUpdatedDate}</td>
                          <td className="d-flex align-items-center justify-content-center gap-1">
                            <Button
                              variant="success"
                              onClick={() =>
                                navigate(
                                  `/admin/product/detailProduct/${product?.id}`
                                )
                              }
                              title="Xem chi tiết"
                            >
                              <IoEyeOutline />
                            </Button>
                            <OverlayTrigger
                              trigger="click"
                              placement={"top"}
                              overlay={popoverSingle}
                              show={currentPopoverId === product?.id}
                              onToggle={() => handleTogglePopover(product?.id)}
                              rootClose={true}
                            >
                              <Button
                                title="Xóa sản phẩm"
                                variant="danger"
                                onClick={() => handleTogglePopover(product?.id)}
                              >
                                <MdDeleteOutline />
                              </Button>
                            </OverlayTrigger>
                            <Button
                              title="Thêm mẫu mã"
                              style={{ border: "none" }}
                              onClick={() => {
                                handleShow();
                                isAddProductItems.current = true;
                                setProduct(product);
                              }}
                            >
                              <TiPlus />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </>
            </Table>
            <div className="d-flex justify-content-end align-items-center">
              {!isFetching && products?.results?.length > 0 ? (
                <PaginationComponent
                  numPage={
                    products?.results?.length > 0 &&
                    Math.ceil(products?.count / limit)
                  }
                  pageCurrent={page}
                  search={searchValue}
                />
              ) : null}
            </div>
          </div>
        </Container>
        <ModalAddComponent
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          searchValue={searchValue}
          refetch={refetch}
          product={product}
          allColours={allColours}
        />
      </div>
    </ContextProducts.Provider>
  );
}
