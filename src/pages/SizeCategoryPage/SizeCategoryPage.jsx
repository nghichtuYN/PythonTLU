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
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { TbSearchOff } from "react-icons/tb";
import { TiDeleteOutline, TiPlus } from "react-icons/ti";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import { useDebounce } from "@uidotdev/usehooks";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { SpinnetComponent } from "../../components/SpinnetComponent/SpinnetComponent";
import { CgSearchLoading } from "react-icons/cg";
import { BsCheck2Circle } from "react-icons/bs";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  deleteSingleSizeCategory,
  deleteSizeCategories,
  getAllSizeCategoriesAPI,
  getSizeCategoryBySearchAPI,
} from "../../services/sizeCategoryAPI";
import { useMutationHook } from "../../hooks/useMutationHook";
export const ContextSizeCategory = createContext("unknown");

const SizeCategoryPage = () => {
  const limit = 10;
  const isSizeCategory = "size_category";
  const placeholder = "Tìm kiếm...";
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredSizeCategories, setFilteredSizeCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPopover, setShowPopover] = useState(false);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const handleCheckItem = (id) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };
  const getAllSizeCategories = async (page) => {
    const res = await getAllSizeCategoriesAPI(page);
    return res.data;
  };

  const getFilterSizeCategoriesBySearch = async (searchValue, page) => {
    const res = await getSizeCategoryBySearchAPI(searchValue, page);
    return res.data;
  };
  const sizeCategoryQuery = useQueryHook(
    ["sizeCategories", page],
    () => getAllSizeCategories(page),
    {
      enabled: !debouncedSearchTerm,
    }
  );
  const fitlerSizeCategoriesQuery = useQueryHook(
    ["filterSizeCategories", debouncedSearchTerm, page],
    () => getFilterSizeCategoriesBySearch(debouncedSearchTerm, page),
    {
      enabled: !!debouncedSearchTerm,
    }
  );
  const { data: sizeCategories, refetch } = sizeCategoryQuery;
  const {
    data: filterSizeCategories,
    refetch: refetchFilterSizeCategories,
    isFetching,
  } = fitlerSizeCategoriesQuery;
  useEffect(() => {
    if (filterSizeCategories) {
      setFilteredSizeCategories(filterSizeCategories?.results);
    } else {
      setFilteredSizeCategories(sizeCategories?.results);
    }
  }, [filterSizeCategories, sizeCategories]);

  const onSuccessDelete = () => {
    if (checkedItems?.length === filteredSizeCategories?.length) {
      if (searchValue !== "") {
        navigate(
          `/admin/size_category/?page=${page - 1}&search=${encodeURIComponent(
            searchValue
          )}`
        );
      } else navigate(`/admin/size_category/?page=${page - 1}`);
      setCheckedItems([]);
    } else {
      setCheckedItems([]);
      if (searchValue !== "") refetchFilterSizeCategories();
      else refetch();
    }
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const onSuccessDeleteSingle = () => {
    if (filteredSizeCategories?.length === 1) {
      if (searchValue !== "")
        navigate(
          `/admin/size_category/?page=${page - 1}&search=${encodeURIComponent(
            searchValue
          )}`
        );
      else navigate(`/admin/size_category/?page=${page - 1}`);
    } else {
      if (searchValue !== "") refetchFilterSizeCategories();
      else refetch();
    }
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };

  const mutationDeleteMany = useMutationHook(
    deleteSizeCategories,
    onSuccessDelete
  );

  const handleDeleteMany = async () => {
    mutationDeleteMany.mutate({ size_categories: checkedItems });
  };

  const mutaionDeleteSingleCategory = useMutationHook((data) => {
    const { id } = data;
    return deleteSingleSizeCategory(id);
  }, onSuccessDeleteSingle);

  const handleDeleteSingle = () => {
    mutaionDeleteSingleCategory.mutate({ id: currentPopoverId });
  };

  const isChecked = (id) => checkedItems.includes(id);

  const handleCheckAll = () => {
    setCheckedItems(
      checkedItems.length === filteredSizeCategories?.length
        ? []
        : filteredSizeCategories?.map((category) => category?.id)
    );
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
      isSizeCategory,
      searchValue,
    }),
    [isSizeCategory, searchValue]
  );
  return (
    <ContextSizeCategory.Provider value={value}>
      {isFetching ? (
        <SpinnetComponent />
      ) : (
        <div
          className="manage-product-page"
          style={{ backgroundColor: "#f3f3f4", height: "120vh" }}
        >
          <Container className="ps-4 pe-4">
            <Row className="pt-4">
              <Col className="text-start ps-5 fw-bolder fs-5">
                Quản lý kích cỡ danh mục
              </Col>
              <Col className="text-end pe-5">
                <span className="fw-bolder">Kích cỡ </span>
                {">"} Quản lý danh mục kích cỡ
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
                      onChange={(e) => setSearchValue(e.target.value)}
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
                          checkedItems.length === filteredSizeCategories?.length
                        }
                      />
                    </th>
                    <th>Tên danh mục</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                    <th>Tùy chỉnh</th>
                  </tr>
                </thead>
                <>
                  <tbody>
                    {!isFetching ? (
                      filteredSizeCategories?.length > 0 ? (
                        filteredSizeCategories?.map((categories) => {
                          const created_date = new Date(categories?.created);
                          const updated_date = new Date(categories?.updated);
                          const formattedCreatedDate =
                            created_date.toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                          const formattedUpdatedDate =
                            updated_date.toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                          return (
                            <tr key={categories?.id}>
                              <td>
                                <Form.Check
                                  checked={isChecked(categories?.id)}
                                  onChange={() =>
                                    handleCheckItem(categories?.id)
                                  }
                                />
                              </td>
                              <td>{categories?.category_name}</td>
                              <td>{formattedCreatedDate}</td>
                              <td>{formattedUpdatedDate}</td>
                              <td className="d-flex align-items-center justify-content-center gap-1">
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    navigate(
                                      `/admin/size_category/detailSizeCategory/${categories?.id}`
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
                      ) : (
                        <tr>
                          <td colSpan={6}>
                            <TbSearchOff size={20} className="me-2" />
                            Không tìm thấy kết quả
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <FaSearch
                            id="search-icon"
                            size={20}
                            className="me-2"
                          />
                          Đang tìm kiếm{" "}
                          <Spinner
                            animation="grow"
                            variant="secondary"
                            size="sm"
                          />
                          <Spinner
                            animation="grow"
                            variant="secondary"
                            size="sm"
                          />
                          <Spinner
                            animation="grow"
                            variant="secondary"
                            size="sm"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              </Table>
              <div className="d-flex justify-content-end align-items-center">
                {!isFetching && filteredSizeCategories?.length > 0 ? (
                  <PaginationComponent
                    numPage={
                      filterSizeCategories?.results?.length > 0
                        ? Math.ceil(filterSizeCategories?.count / limit)
                        : Math.ceil(sizeCategories?.count / limit)
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
            refetch={refetch}
            refetchFilter={refetchFilterSizeCategories}
          />
        </div>
      )}
    </ContextSizeCategory.Provider>
  );
};

export default SizeCategoryPage;
