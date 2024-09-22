import React, { useContext, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import AddProductModalBodyComponent from "../AddProductModalBodyComponent/AddProductModalBodyComponent";
import { AddCategoryComponent } from "../AddCategoryComponent/AddCategoryComponent";
import { ContextCategory } from "../../pages/ManageCategoryPage/ManageCategoryPage";
import { useMutationHook } from "../../hooks/useMutationHook";
import {
  addChildCategories,
  createCategory,
} from "../../services/productCategory";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { DetailCategoryContext } from "../../pages/DetailCategoryPage/DetailCategoryPage";
import AddSubCategoriesComponent from "../AddSubCategoriesComponent/AddSubCategoriesComponent";
import { ContextSizeCategory } from "../../pages/SizeCategoryPage/SizeCategoryPage";
import AddSizeCategoryComponent from "../AddSizeCategoryComponent/AddSizeCategoryComponent";
import { addSizeCategory } from "../../services/sizeCategoryAPI";
import { DetailSizeCategoryContext } from "../../pages/DetailSizeCategoryPage/DetailSizeCategoryPage";
import AddSizeOptionsCompoenent from "../AddSizeOptionsComponent/AddSizeOptionsComponent";
import { addSizeOptionsBySizeCategory } from "../../services/sizeOption";
import { ContextProducts } from "../../pages/ManageProduct/ManageProduct";
import { createProductAPI } from "../../services/products";
import AddProductItemsModalBodyComponent from "../AddProductItemsModalBodyComponent/AddProductItemsModalBodyComponent";
import { createProductItemAPI } from "../../services/productItems";
import { BsCheck2Circle } from "react-icons/bs";
import { DetailProductContext } from "../../pages/DetailProductPage/DetailProductPage";
import { DetailProductItemContext } from "../../pages/DetailProductItemPage/DetailProductItemPage";
import AddProductVariation from "../AddProductVariation/AddProductVariation";
import { createProductVariationByProductItemsAPI } from "../../services/productVariation";

const ModalAddComponent = (props) => {
  const dataRecord = useRef({});
  const {
    show,
    handleClose,
    refetch,
    product,
    allColours,
  } = props;
  const { isCategory } = useContext(ContextCategory);
  const { isSizeCategory } = useContext(ContextSizeCategory);
  const { isDetailCategory, categoryId } = useContext(DetailCategoryContext);
  const { isDetailSizeCategory, sizeCategoryId, sizeCategoryName } = useContext(
    DetailSizeCategoryContext
  );
  const { isProduct, isAddProductItems } = useContext(ContextProducts);
  const { isDetailProduct } = useContext(DetailProductContext);
  const { isDetailProductItem } = useContext(DetailProductItemContext);
  const { setToaster } = useContext(Context);
  const addRecord = (data, condision) => {
    if (condision === isCategory) {
      return createCategory(data);
    }
    if (condision === isDetailCategory) {
      return addChildCategories(categoryId, data);
    }
    if (condision === isSizeCategory) {
      return addSizeCategory(data);
    }
    if (condision === isDetailSizeCategory) {
      return addSizeOptionsBySizeCategory(data);
    }
    if (condision === isProduct) {
      return createProductAPI(data);
    }
    if (condision === isDetailProductItem) {
      return createProductVariationByProductItemsAPI(data);
    }
    if (condision === isAddProductItems?.current || isDetailProduct) {
      return createProductItemAPI(data);
    }
  };
  const onSuccess = () => {
    refetch();

    setToaster({
      type: "success",
      message: "Tạo thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const mutaionAddRecord = useMutationHook((dt) => {
    const { data, condision } = dt;
    return addRecord(data, condision);
  }, onSuccess);

  const handleAdd = (event) => {
    event.preventDefault();
    if (isCategory) {
      mutaionAddRecord.mutate({
        data: dataRecord.current,
        condision: isCategory,
      });
    }
    if (isDetailCategory) {
      mutaionAddRecord.mutate({
        data: dataRecord.current,
        condision: isDetailCategory,
      });
    }
    if (isSizeCategory) {
      mutaionAddRecord.mutate({
        data: dataRecord.current,
        condision: isSizeCategory,
      });
    }
    if (isDetailSizeCategory) {
      mutaionAddRecord.mutate({
        data: {
          size_category: sizeCategoryId,
          ...dataRecord.current,
        },
        condision: isDetailSizeCategory,
      });
    }
    if (isProduct && !isAddProductItems.current) {
      mutaionAddRecord.mutate({
        data: dataRecord.current,
        condision: isProduct,
      });
    }
    if (isAddProductItems?.current || isDetailProduct) {
      mutaionAddRecord.mutate({
        data: dataRecord?.current,
        condision: isAddProductItems?.current || isDetailProduct,
      });
    }
    if (isDetailProductItem) {
      mutaionAddRecord.mutate({
        data: dataRecord?.current,
        condision: isDetailProductItem,
      });
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      enforceFocus={true}
      size="lg"
      autoFocus={true}
    >
      <Modal.Header className="text-center">
        {isProduct && !isAddProductItems.current ? (
          <Modal.Title className="w-100">Thêm sản phẩm mới</Modal.Title>
        ) : isAddProductItems?.current || isDetailProduct ? (
          <Modal.Title className="w-100">Thêm mẫu mã sản phẩm mới</Modal.Title>
        ) : isCategory ? (
          <Modal.Title className="w-100">Thêm danh mục mới</Modal.Title>
        ) : isDetailCategory ? (
          <Modal.Title className="w-100">Thêm danh mục con mới</Modal.Title>
        ) : isSizeCategory ? (
          <Modal.Title className="w-100">Thêm kích cỡ danh mục mới</Modal.Title>
        ) : isDetailSizeCategory ? (
          <Modal.Title className="w-100">
            Thêm lựa chọn kích cỡ danh mục {sizeCategoryName}
          </Modal.Title>
        ) : isDetailProductItem ? (
          <Modal.Title className="w-100">
            Thêm biến thể mẫu mã {sizeCategoryName}
          </Modal.Title>
        ) : null}
      </Modal.Header>
      <Modal.Body>
        {isProduct && !isAddProductItems.current ? (
          <AddProductModalBodyComponent dataRecord={dataRecord} />
        ) : isAddProductItems?.current || isDetailProduct ? (
          <AddProductItemsModalBodyComponent
            dataRecord={dataRecord}
            product={product}
            allColours={allColours}
          />
        ) : isCategory ? (
          <AddCategoryComponent dataRecord={dataRecord} />
        ) : isDetailCategory ? (
          <AddSubCategoriesComponent dataRecord={dataRecord} />
        ) : isSizeCategory ? (
          <AddSizeCategoryComponent dataRecord={dataRecord} />
        ) : isDetailSizeCategory ? (
          <AddSizeOptionsCompoenent dataRecord={dataRecord} />
        ) : isDetailProductItem ? (
          <AddProductVariation dataRecord={dataRecord} />
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button onClick={handleAdd} variant="primary">
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalAddComponent);
