import React, {  useEffect, useState } from "react";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { getAllSizeOptionsV2 } from "../../services/sizeOption";
import { useQueryHook } from "../../hooks/useQueryHook";

const AddProductItemsModalBodyComponent = ({
  dataRecord,
  product,
  allColours,
}) => {
  const [productName, setProductName] = useState(product?.product_name);
  const [productDescription, setProductDescription] = useState(
    product?.product_description
  );
  const [categoryId, setCategoryID] = useState(product?.product_category?.id);
  const [brandId, setBrandId] = useState(product?.brand?.id);
  const [colour, setColour] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [images, setImages] = useState(null);
  const [qtyInStock, setQtyInStock] = useState();
  const [sizeOption, setSizeOption] = useState("");
  const getAllSizeOptionsBySizeCategory = async (data) => {
    const res = await getAllSizeOptionsV2(data);
    return res.data;
  };
  const { data: allSizeOptions } = useQueryHook(
    ["allSizeOptions", product?.product_category?.size_category?.id],
    () =>
      getAllSizeOptionsBySizeCategory({
        id: product?.product_category?.size_category?.id,
      }),
    {
      enabled: !!product?.product_category?.size_category?.id,
    }
  );
  useEffect(() => {
    if (product) {
      setProductName(product.product_name || "");
      setProductDescription(product.product_description || "");
      setCategoryID(product.product_category?.id || 0);
      setBrandId(product.brand?.id || 0);
    }
  }, [product]);

  const hasChangeProduct =
    productName !== product?.product_name ||
    productDescription !== product?.product_description ||
    brandId !== product?.brand?.id ||
    categoryId !== product?.product_category?.id;

  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        productId: product?.id,
        product_name: productName,
        product_description: productDescription,
        product_category: categoryId,
        brand: brandId,
        qty_in_stock: qtyInStock,
        size_option: sizeOption,
        colour: colour,
        original_price: originalPrice,
        salePrice: originalPrice - (salePrice / 100) * originalPrice,
        image_filename: images,
        hasChange: hasChangeProduct,
      };
    }
  }, [
    product?.id,
    dataRecord,
    productName,
    productDescription,
    categoryId,
    brandId,
    qtyInStock,
    sizeOption,
    originalPrice,
    salePrice,
    colour,
    images,
    hasChangeProduct,
  ]);

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>
            Tên sản phẩm <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            as="textarea"
            type="password"
            placeholder="Nhập mô tả sản phẩm"
            style={{ height: "100px" }}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            disabled
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <FloatingLabel
              controlId="floatingSelectGridCategory"
              label={
                <>
                  Danh mục <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select
                disabled
                onChange={(e) => setCategoryID(e.target.value)}
              >
                <option value={0}>
                  {product?.product_category?.category_name}
                </option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <FloatingLabel
              controlId="floatingSelectGridBrand"
              label={
                <>
                  Thương hiệu <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select
                disabled
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value={0}>{product?.brand?.brand_name}</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <FloatingLabel
              controlId="floatingSelectGridColour"
              label={
                <>
                  Màu sắc <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select onChange={(e) => setColour(e.target.value)}>
                <option value={0}>---Chọn màu sắc---</option>
                {allColours?.map((colour) => (
                  <option key={colour?.id} value={colour?.id}>
                    {colour?.colour_name}
                    <span style={{ backgroundColor: colour?.hex_code }}></span>
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Form.Group as={Col} md="6" controlId="validationOriginalPrice">
          <Form.Label>
            Giá gốc <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setOriginalPrice(e.target.value)}
              type="number"
              min={0}
              placeholder="Nhập giá gốc"
              className="lh-lg original-price"
            />
            <InputGroup.Text>0.00</InputGroup.Text>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationSalePrice">
          <Form.Label>
            Giá khuyến mại <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setSalePrice(e.target.value)}
              type="number"
              min={0}
              placeholder="Nhập giá khuyến mại"
              className="lh-lg sale-price"
              required
            />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="align-items-center mb-3">
        <Form.Group as={Col} md="6" controlId="validationQuantity">
          <Form.Label>
            Số lượng trong kho <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup as={Col} md="6">
            <Form.Control
              onChange={(e) => setQtyInStock(e.target.value)}
              type="number"
              min={0}
              placeholder="Nhập số lượng"
              className="lh-lg sale-price"
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationSize">
          <Form.Label>
            Kích cỡ <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select onChange={(e) => setSizeOption(e.target.value)}>
            <option>---Chọn kích cỡ---</option>
            {allSizeOptions?.map((sizeOption) => (
              <option key={sizeOption?.id} value={sizeOption?.id}>
                {sizeOption?.size_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>
          Hình ảnh {"("}tối đa 4{")"} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
      </Form.Group>
    </>
  );
};

export default AddProductItemsModalBodyComponent;
