import React, { useContext, useEffect, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import { getAllSizeOptionsV2 } from "../../services/sizeOption";
import { DetailProductItemContext } from "../../pages/DetailProductItemPage/DetailProductItemPage";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

const AddProductVariation = ({ dataRecord }) => {
  const [qtyInStock, setQtyInStock] = useState();
  const [sizeOption, setSizeOption] = useState("");
  const getAllSizeOptionsBySizeCategory = async (data) => {
    const res = await getAllSizeOptionsV2(data);
    return res.data;
  };
  const { productItem } = useContext(DetailProductItemContext);
  const { data: allSizeOptions } = useQueryHook(
    [
      "allSizeOptions",
      productItem?.product?.product_category?.size_category?.id,
    ],
    () =>
      getAllSizeOptionsBySizeCategory({
        id: productItem?.product?.product_category?.size_category?.id,
      })
  );

  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        qty_in_stock: qtyInStock,
        product_items: productItem?.id,
        size_option: sizeOption,
      };
    }
  }, [dataRecord, qtyInStock, sizeOption, productItem]);
  return (
    <div>
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
    </div>
  );
};

export default AddProductVariation;
