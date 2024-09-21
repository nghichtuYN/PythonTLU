import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
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
import { TiPlus } from "react-icons/ti";
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import { IoEyeOutline } from "react-icons/io5";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import {
  getDetailSizeCategoryByIdAPI,
  updateSizeCategoryAPI,
} from "../../services/sizeCategoryAPI";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  deleteSingleSizeOption,
  deleteSizeOptions,
  getAllSizeOptions,
} from "../../services/sizeOption";
import { BsCheck2Circle } from "react-icons/bs";
import { SpinnetComponent } from "../../components/SpinnetComponent/SpinnetComponent";
import { MdDeleteOutline } from "react-icons/md";
export const DetailSizeCategoryContext = createContext("unknown");

const DetailSizeCategoryPage = () => {
  const navigate = useNavigate();
  const { setToaster } = useContext(Context);
  const { id } = useParams();
  const placeholder = "Tìm kiếm...";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDetailSizeCategory = "deltailSizeCategory";
  const [categoryName, setCategoryName] = useState("");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const getDetailSizeCategoryByID = async (id) => {
    try {
      const res = await getDetailSizeCategoryByIdAPI(id);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  const getAllSizeOptionsBySizeCategory = async (id) => {
    const res = await getAllSizeOptions(id);
    return res.data;
  };

  const {
    data: sizeCategory,
    isLoading,
    refetch,
  } = useQueryHook(["sizeCategory", id], () => getDetailSizeCategoryByID(id), {
    enabled: !!id,
  });

  const { data: allSizeOptions, refetch: sizeOptionRefetch } = useQueryHook(
    ["allSizeOptions", id],
    () => getAllSizeOptionsBySizeCategory(id),
    {
      enabled: !!id,
    }
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
      checkedItems.length === sizeOptions.length
        ? []
        : sizeOptions.map((size_options) => size_options?.id)
    );
  };
  const handleCancel = () => {
    setShowPopover(false);
  };
  useEffect(() => {
    if (sizeCategory && allSizeOptions) {
      setCategoryName(sizeCategory?.category_name);
      setSizeOptions(allSizeOptions?.results);
    }
  }, [sizeCategory, allSizeOptions]);

  const onSuccess = () => {
    sizeOptionRefetch();
    setToaster({
      type: "success",
      message: "Xóa thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
    if (checkedItems) setCheckedItems([]);
  };
  const onSuccessSizeCategory = () => {
    refetch();
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
    if (checkedItems) setCheckedItems([]);
  };

  const mutationDeleteMany = useMutationHook((data) => {
    return deleteSizeOptions(data);
  }, onSuccess);

  const handleDeleteMany = async () => {
    mutationDeleteMany.mutate({
      size_options: checkedItems,
    });
  };

  const mutationDeleteSingle = useMutationHook((data) => {
    const { id } = data;
    return deleteSingleSizeOption(id);
  }, onSuccess);
  const handleDeleteSingleSizeOption = () => {
    mutationDeleteSingle.mutate({ id: currentPopoverId });
  };
  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const updateSizeCategory = async (data) => {
    const { id, ...rest } = data;
    return updateSizeCategoryAPI(id, rest);
  };

  const mutationUpdate = useMutationHook(
    updateSizeCategory,
    onSuccessSizeCategory
  );

  const handleConfirmUpdate = () => {
    mutationUpdate.mutate({
      id: sizeCategory?.id,
      category_name: categoryName,
    });
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
            handleDeleteSingleSizeOption();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const value = useMemo(
    () => ({
      isDetailSizeCategory,
      sizeCategoryId: sizeCategory?.id,
      isCreatedSizeOptions: allSizeOptions?.results,
      sizeCategoryName: sizeCategory?.category_name,
    }),
    [isDetailSizeCategory, sizeCategory, allSizeOptions]
  );
  return (
    <DetailSizeCategoryContext.Provider value={value}>
      <>
        {isLoading ? (
          <SpinnetComponent />
        ) : (
          <div
            className="manage-product-detail-page"
            style={{ backgroundColor: "#f3f3f4", height: "140vh" }}
          >
            <Container className="ps-4 pe-4">
              <Row className="pt-4">
                <Col className="text-start ps-5 fw-bolder fs-5">
                  <p>
                    Chi tiết danh mục: {sizeCategory?.category_name} <u />
                  </p>
                </Col>
                <Col className="text-end pe-5">
                  <span
                    className="fw-bolder "
                    onClick={() => navigate("/admin/categories")}
                  >
                    Kích cỡ{" "}
                  </span>
                  {">"} Quản lý danh mục kích cỡ{">"} Chi tiết danh mục kích cỡ
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
                      Thêm lựa chọn kích cỡ
                    </Button>
                  </Col>
                </Row>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formCategoryName"
                  >
                    <Form.Label className="text-start ps-4" column sm="2">
                      Tên danh mục:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formChildCategories"
                  >
                    <Form.Label className="text-start ps-4">
                      Danh sách kích cỡ:
                    </Form.Label>
                    <Col className="d-flex justify-content-end me-5 align-items-center">
                      <AdninSearchComponent placeholder={placeholder} />
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
                                checkedItems.length === sizeOptions.length
                              }
                            />
                          </th>
                          <th>Tên kích cỡ </th>
                          <th>Ngày tạo</th>
                          <th>Ngày cập nhật</th>
                          <th>Tùy chỉnh</th>
                        </tr>
                      </thead>
                      <Collapse in={!!sizeCategory} dimension={"height"}>
                        <tbody>
                          {sizeOptions?.map((categories) => {
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
                                <td>{categories?.size_name}</td>
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
                          })}
                        </tbody>
                      </Collapse>
                    </Table>
                  </Form.Group>
                </Form>

                <div className="d-flex justify-content-end align-items-center">
                  {/* <PaginationComponent
              //   numPage={Math.ceil(categories?.count / limit)}
              //   pageCurrent={page}
              //   next={categories?.next}
              //   previous={categories?.previous}
              //   limit={limit}
              //   refetch={refetch}
              /> */}
                  <Button
                    onClick={handleConfirmUpdate}
                    variant="dark"
                    className="me-3 my-3"
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            </Container>
            <ModalAddComponent
              handleClose={handleClose}
              handleShow={handleShow}
              show={show}
              refetch={sizeOptionRefetch}
            />
          </div>
        )}
      </>
    </DetailSizeCategoryContext.Provider>
  );
};

export default DetailSizeCategoryPage;
