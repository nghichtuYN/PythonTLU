import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import { getProductVariationByProductItemsAPI } from "../../services/productVariation";
import { useQueryHook } from "../../hooks/useQueryHook";
import { getDetailProductItemsAPI } from "../../services/productItems";
import { TiPlus } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
// import noimage from "../../assets/images/noimage.jpg";
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";

export const DetailProductItemContext = createContext("unknow");
const DetailProductItemPage = () => {
  const { id } = useParams();
  // const { setToaster } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDetailProductItem = "Chi tiết mẫu mã sản phẩm";
  const isProductVariation = "Biến thể mẫu mã";
  const placeholder = "Tìm kiếm...";
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const limit = 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  // const debouncedSearchTerm = useDebounce(search, 1000);

  const getAllVariation = async (id) => {
    const res = await getProductVariationByProductItemsAPI(id);
    return res.data;
  };

  const getDetailProductItemByID = async (id) => {
    try {
      const res = await getDetailProductItemsAPI(id);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  const { data: productItem } = useQueryHook(["productItem", id], () =>
    getDetailProductItemByID(id)
  );
  const { data: allVariation, refetch: reFetchVariation } = useQueryHook(
    ["allVariation", id],
    () => getAllVariation(id)
  );
  const handleCancel = () => {
    setShowPopover(false);
  };
  const popover = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Xóa tất cả mục đã chọn</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger">
          Hủy
        </Button>
        <Button
          size="sm"
          onClick={() => {
            // handleDeleteMany();
            handleCancel();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
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
      checkedItems.length === allVariation?.results?.length
        ? []
        : allVariation?.results?.map((item) => item?.id)
    );
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };
  const handleConfirmUpdate = () => {
    // mutationUpdate.mutate({
    //   id: product?.id,
    //   product_name: productName,
    //   product_category: categoryId,
    //   brand: brandId,
    // });
  };

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
            // handleDeleteSingle();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const value = useMemo(
    () => ({
      isDetailProductItem,
      isProductVariation,
      productItem,
    }),
    [isDetailProductItem, isProductVariation, productItem]
  );
  return (
    <>
      <DetailProductItemContext.Provider value={value}>
        <div
          className="manage-product-items-detail-page pb-2"
          style={{ backgroundColor: "#f3f3f4", height: "auto" }}
        >
          <Container className="ps-4 pe-4">
            <Row className="pt-4">
              <Col className="text-start ps-5 fw-bolder fs-5">
                <p>
                  {isDetailProductItem}: {productItem?.product?.product_name}
                </p>
              </Col>
              <Col className="text-end pe-5">
                <span
                  className="fw-bolder "
                  // onClick={() => navigate("/admin/categories")}
                >
                  Sản phẩm{" "}
                </span>
                {">"} Quản lý sản phẩm {">"} Chi tiết tiết sản phẩm {">"} Chi
                tiết mẫu mã
              </Col>
            </Row>
            <div className="mt-3" style={{ backgroundColor: "#ffffff" }}>
              <Row className="pt-4 mb-4">
                <Col className="d-flex justify-content-start gap-1 ms-5 align-items-center">
                  {checkedItems?.length > 0 && (
                    <OverlayTrigger
                      trigger="click"
                      placement={"top"}
                      overlay={popover}
                      show={showPopover}
                      onToggle={() => setShowPopover(!showPopover)}
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
                  <Button
                    className="add-btn"
                    size="md"
                    style={{ border: "none" }}
                    onClick={handleShow}
                  >
                    <TiPlus />
                    Thêm biến thể mẫu mã mới
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end gap-1 ms-5 align-items-center">
                  <Button
                    onClick={handleConfirmUpdate}
                    variant="dark"
                    className="me-3 my-3"
                  >
                    Xác nhận
                  </Button>
                </Col>
              </Row>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formChildCategories"
              >
                <Form.Label className="text-start ps-4">
                  Danh sách mẫu mã:
                </Form.Label>
                <Col className="d-flex justify-content-end me-5 align-items-center">
                  <AdninSearchComponent
                    onChange={onChange}
                    placeholder={placeholder}
                    value={search}
                  />
                </Col>
                <Table
                  responsive
                  className="category-table"
                  style={{ overflowY: "scroll" }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "grey" }}>
                      <th>
                        <Form.Check
                            onChange={handleCheckAll}
                          checked={
                            checkedItems?.length ===
                            allVariation?.results?.length
                          }
                        />
                      </th>
                      <th>Tên kích cỡ</th>
                      <th>Số lượng</th>
                      <th>Ngày tạo</th>
                      <th>Ngày cập nhật</th>
                      <th>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <Collapse in={!!allVariation} dimension={"height"}>
                    <tbody>
                      {allVariation?.results?.map((variation) => {
                        const created_date = new Date(variation?.created);
                        const updated_date = new Date(variation?.updated);
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
                          <tr key={variation?.id}>
                            <td>
                              <Form.Check
                              checked={isChecked(variation?.id)}
                              onChange={() =>
                                handleCheckItem(variation?.id)
                              }
                              />
                            </td>
                            <td>{variation?.size_option?.size_name}</td>
                            <td>{variation?.qty_in_stock}</td>
                            <td>{formattedCreatedDate}</td>
                            <td>{formattedUpdatedDate}</td>
                            <td style={{ width: "200px" }}>
                              <Button
                                variant="success"
                                onClick={() =>
                                  navigate(
                                    `/admin/product/variation/${variation?.id}`
                                  )
                                }
                              >
                                <IoEyeOutline />
                              </Button>
                              <OverlayTrigger
                                trigger="click"
                                placement={"top"}
                                overlay={popoverSingle}
                                show={currentPopoverId === variation?.id}
                                onToggle={() =>
                                  handleTogglePopover(variation?.id)
                                }
                                rootClose={true}
                              >
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleTogglePopover(variation?.id)
                                  }
                                  className="ms-2 d-flex-inline"
                                >
                                  <MdDeleteOutline />
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Collapse>
                </Table>
              </Form.Group>
              <div className="d-flex justify-content-end align-items-center">
                <PaginationComponent
                  numPage={Math.ceil(allVariation?.count / limit)}
                  pageCurrent={page}
                  refetch={reFetchVariation}
                  search={search}
                />
              </div>
            </div>
          </Container>
          <ModalAddComponent
            handleClose={handleClose}
            handleShow={handleShow}
            show={show}
            refetch={reFetchVariation}
          />
        </div>
      </DetailProductItemContext.Provider>
    </>
  );
};

export default DetailProductItemPage;
