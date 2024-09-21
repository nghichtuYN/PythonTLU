import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteChildCategories,
  getAllCategoriesNoPaninationAPI,
  getCategoryById,
  updateCategoryAPI,
} from "../../services/productCategory";
import { useQueryHook } from "../../hooks/useQueryHook";
import { SpinnetComponent } from "../../components/SpinnetComponent/SpinnetComponent";
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
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import { TiPlus } from "react-icons/ti";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { BsCheck2Circle } from "react-icons/bs";
export const DetailCategoryContext = createContext("unknown");
export const DetailCategoryPage = () => {
  const navigate = useNavigate();
  const { setToaster } = useContext(Context);
  const { id } = useParams();
  const placeholder = "Tìm kiếm...";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDetailCategory = "deltailCategory";
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [is_active, setIs_Active] = useState(false);
  const [child_categories, setChild_categories] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  //get detail info category fn
  const getDetailCategoryByID = async (id) => {
    try {
      const res = await getCategoryById(id);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  const {
    data: category,
    isLoading,
    refetch,
  } = useQueryHook(["category", id], () => getDetailCategoryByID(id), {
    enabled: !!id,
  });
  // get all categories no panianation fn

  const getAllProductCategoryNoPanination = async () => {
    const res = await getAllCategoriesNoPaninationAPI();
    return res.data;
  };

  const { data: allCategories } = useQueryHook(
    ["allCategories"],
    getAllProductCategoryNoPanination,
    { enabled: !!show }
  );

  useEffect(() => {
    if (category) {
      setCategoryName(category?.category_name);
      setCategoryDescription(category?.category_description);
      setIs_Active(category?.is_active);
      setChild_categories(category?.child_categories);
    }
  }, [category]);

  const onSuccess = () => {
    refetch();
    setToaster({
      type: "success",
      message: "Xóa thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });

  };
  const mutationDeleteSingleChild = useMutationHook((data) => {
    const { parentId, child_categories } = data;
    return deleteChildCategories(parentId, { child_categories });
  }, onSuccess);

  const deleteSingleChilCategoies = () => {
    const catDeleted = child_categories.find(
      (cat) => cat.id === currentPopoverId
    );
    mutationDeleteSingleChild.mutate({
      parentId: category?.id,
      child_categories: [catDeleted?.id],
    });
  };

  const updateCategory = async (data) => {
    const { id, ...rest } = data;
    return updateCategoryAPI(id, rest);
  };

  const mutationUpdate = useMutationHook(updateCategory, onSuccess);
  const handleActive = (id, is_active) => {
    mutationUpdate.mutate({ id, is_active: !is_active });
  };

  const handleConfirmUpdate = () => {
    mutationUpdate.mutate({
      id: category?.id,
      category_name: categoryName,
      category_description: categoryDescription,
      is_active: is_active,
    });
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
      checkedItems.length === category?.child_categories?.length
        ? []
        : category?.child_categories?.map((category) => category?.id)
    );
  };
  const handleCancel = () => {
    setShowPopover(false);
  };

  const handleDeleteMany = () => {
    mutationDeleteSingleChild.mutate({
      parentId: category?.id,
      child_categories: checkedItems,
    });
    setCheckedItems([])
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

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
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
            deleteSingleChilCategoies();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const value = useMemo(
    () => ({
      isDetailCategory,
      allCategories,
      categoryId: category?.id,
      isCheckedCategories: category?.child_categories,
    }),
    [isDetailCategory, allCategories, category]
  );
  return (
    <DetailCategoryContext.Provider value={value}>
      <>
        {isLoading ? (
          <SpinnetComponent />
        ) : (
          <div
            className="manage-product-detail-page pb-2"
            style={{ backgroundColor: "#f3f3f4", height: "auto" }}
          >
            <Container className="ps-4 pe-4">
              <Row className="pt-4">
                <Col className="text-start ps-5 fw-bolder fs-5">
                  <p>
                    Chi tiết danh mục: {category?.category_name} <u />
                  </p>
                </Col>
                <Col className="text-end pe-5">
                  <span
                    className="fw-bolder "
                    onClick={() => navigate("/admin/categories")}
                  >
                    Danh mục{" "}
                  </span>
                  {">"} Quản lý danh mục {">"} Chi tiết danh mục
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
                      Thêm danh mục con
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
                    controlId="formCategoryDescriptions"
                  >
                    <Form.Label className="text-start ps-4" column sm="2">
                      Mô tả danh mục:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        value={categoryDescription}
                        as="textarea"
                        onChange={(e) => setCategoryDescription(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formChildCategories"
                  >
                    <Form.Label className="text-start ps-4">
                      Danh sách danh mục con:
                    </Form.Label>
                    <Col className="d-flex justify-content-end me-5 align-items-center">
                      <AdninSearchComponent placeholder={placeholder} />
                    </Col>
                    <Table responsive className="category-table" style={{overflowY:'scroll'}}>
                      <thead>
                        <tr style={{ backgroundColor: "grey" }}>
                          <th>
                            <Form.Check
                              onChange={handleCheckAll}
                              checked={
                                checkedItems.length ===
                                category?.child_categories?.length
                              }
                            />
                          </th>
                          <th>Tên danh mục</th>
                          <th>Mô tả danh mục</th>
                          <th>Ngày tạo</th>
                          <th>Ngày cập nhật</th>
                          <th>Tình trạng</th>
                          <th>Tùy chỉnh</th>
                        </tr>
                      </thead>
                      <Collapse in={!!category} dimension={"height"}>
                        <tbody>
                          {child_categories?.map((categories) => {
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
                                <td>{categories?.category_description}</td>
                                <td>{formattedCreatedDate}</td>
                                <td>{formattedUpdatedDate}</td>
                                <td>
                                  <Form.Check
                                    onChange={() =>
                                      handleActive(
                                        categories?.id,
                                        categories?.is_active
                                      )
                                    }
                                    checked={categories?.is_active}
                                    type="switch"
                                  />
                                </td>
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
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formIsActive"
                  >
                    <Form.Label className="text-start ps-4" column sm="2">
                      Kích hoạt:
                    </Form.Label>
                    <Col sm="10" className="text-start pt-2">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={is_active}
                        onChange={() => setIs_Active(!is_active)}
                      />
                    </Col>
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
                  <Button onClick={handleConfirmUpdate} variant="dark" className="me-3 my-3">
                    Xác nhận
                  </Button>
                </div>
              </div>
            </Container>
            <ModalAddComponent
              handleClose={handleClose}
              handleShow={handleShow}
              show={show}
              refetch={refetch}
            />
          </div>
        )}
      </>
    </DetailCategoryContext.Provider>
  );
};
