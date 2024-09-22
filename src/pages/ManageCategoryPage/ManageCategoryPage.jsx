/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import { TiPlus } from "react-icons/ti";
import { TbSearchOff } from "react-icons/tb";
import { CgSearchLoading } from "react-icons/cg";
import { TiDeleteOutline } from "react-icons/ti";

import "./style.css";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import { MdDeleteOutline } from "react-icons/md";
import {
  deleteCategories,
  deleteSingleCategory,
  getAllCategoriesAPI,
  getAllCategoriesNoPaninationAPI,
  getCategoryBySearch,
  updateCategoryAPI,
} from "../../services/productCategory";
import { useQueryHook } from "../../hooks/useQueryHook";
import { IoEyeOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { SpinnetComponent } from "../../components/SpinnetComponent/SpinnetComponent";
import { FaSearch } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { useDebounce } from "@uidotdev/usehooks";
import { getAllSizeCategoriesNoPaninationAPI } from "../../services/sizeCategoryAPI";
import SpinerComponent from "../../components/SpinerComponent/SpinerComponent";
export const ContextCategory = createContext("unknown");

export default function ManageCategoryPage() {
  const limit = 10;
  const isCategory = "category";
  const placeholder = "Tìm kiếm...";
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";
  const [checkedItems, setCheckedItems] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPopover, setShowPopover] = useState(false);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  //get all categories fn
  const getAllProductCategory = async (page, search) => {
    const res = await getAllCategoriesAPI(page, search);
    return res.data;
  };

  // get all categories no panination fn
  const getAllProductCategoryNoPanination = async () => {
    const res = await getAllCategoriesNoPaninationAPI();
    return res.data;
  };
  const getAllSizeCategoriesNoPanination = async () => {
    const res = await getAllSizeCategoriesNoPaninationAPI();
    return res.data;
  };
  const {
    data: categories,
    refetch,
    isFetching,
  } = useQueryHook(["categories", page, debouncedSearchTerm], () =>
    getAllProductCategory(page, debouncedSearchTerm)
  );

  const { data: allSizeCategories } = useQueryHook(
    ["allSizeCategories"],
    getAllSizeCategoriesNoPanination,
    { enabled: !!show }
  );
  const { data: allCategories } = useQueryHook(
    ["allCategories"],
    getAllProductCategoryNoPanination,
    { enabled: !!show }
  );

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
      checkedItems.length === categories?.results?.length
        ? []
        : categories?.results?.map((category) => category?.id)
    );
  };

  const onSuccessDelete = () => {
    if (checkedItems?.length === categories?.results?.length) {
      if (page !== "1") {
        if (searchValue !== "") {
          navigate(
            `/admin/category/?page=${page - 1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        } else navigate(`/admin/category/?page=${page - 1}`);
        setCheckedItems([]);
      } else {
        if (searchValue !== "")
          navigate(
            `/admin/category/?page=${1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        else navigate(`/admin/category/?page=${1}`);
        setCheckedItems([]);
      }
    }
    refetch();
    setCheckedItems([]);

    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };

  const onSuccessDeleteSingle = () => {
    if (categories?.results?.length === 1) {
      if (page !== "1") {
        if (searchValue !== "")
          navigate(
            `/admin/category/?page=${page - 1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        else navigate(`/admin/category/?page=${page - 1}`);
      } else {
        if (searchValue !== "")
          navigate(
            `/admin/category/?page=${1}&search=${encodeURIComponent(
              searchValue
            )}`
          );
        else navigate(`/admin/category/?page=${1}`);
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
  const mutationDeleteMany = useMutationHook(deleteCategories, onSuccessDelete);

  const handleDeleteMany = async () => {
    mutationDeleteMany.mutate({ categories: checkedItems });
  };

  const handleCancel = () => {
    setShowPopover(false);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const mutaionDeleteSingleCategory = useMutationHook((data) => {
    const { id } = data;
    return deleteSingleCategory(id);
  }, onSuccessDeleteSingle);

  const handleDeleteSingle = () => {
    mutaionDeleteSingleCategory.mutate({ id: currentPopoverId });
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
      allCategories,
      isCategory,
      searchValue,
      allSizeCategories,
    }),
    [allCategories, isCategory, searchValue, allSizeCategories]
  );
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    navigate(
      `/admin/category/?page=1&search=${encodeURIComponent(e.target.value)}`
    );
  };
  return (
    <ContextCategory.Provider value={value}>
      <div
        className="manage-product-page"
        style={{ backgroundColor: "#f3f3f4", height: "120vh" }}
      >
        <Container className="ps-4 pe-4">
          <Row className="pt-4">
            <Col className="text-start ps-5 fw-bolder fs-5">
              Quản lý danh mục
            </Col>
            <Col className="text-end pe-5">
              <span className="fw-bolder">Danh mục </span>
              {">"} Quản lý danh mục
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
                        checkedItems.length === categories?.results?.length
                      }
                    />
                  </th>
                  <th>Tên danh mục</th>
                  <th>Mô tả danh mục</th>
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
                    categories?.results?.length > 0 &&
                    categories?.results?.map((categories) => {
                      const created_date = new Date(categories?.created);
                      const updated_date = new Date(categories?.updated);
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
                        <tr key={categories?.id}>
                          <td>
                            <Form.Check
                              checked={isChecked(categories?.id)}
                              onChange={() => handleCheckItem(categories?.id)}
                            />
                          </td>
                          <td>{categories?.category_name}</td>
                          <td>{categories?.category_description}</td>
                          <td>{formattedCreatedDate}</td>
                          <td>{formattedUpdatedDate}</td>
                          <td className="d-flex align-items-center justify-content-center gap-1">
                            <Button
                              variant="success"
                              onClick={() =>
                                navigate(
                                  `/admin/category/detailCategory/${categories?.id}`
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
                              show={currentPopoverId === categories?.id}
                              onToggle={() =>
                                handleTogglePopover(categories?.id)
                              }
                              rootClose={true}
                            >
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleTogglePopover(categories?.id)
                                }
                              >
                                <MdDeleteOutline />
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </>
            </Table>
            <div className="d-flex justify-content-end align-items-center">
              {!isFetching && categories?.results?.length > 0 ? (
                <PaginationComponent
                  numPage={
                    categories?.results?.length > 0 &&
                    Math.ceil(categories?.count / limit)
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
          // refetchFilter={refetchFilterCategories}
        />
      </div>
    </ContextCategory.Provider>
  );
}
