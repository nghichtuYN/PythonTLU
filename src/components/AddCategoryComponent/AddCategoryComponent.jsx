import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Accordion,
  Button,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import "./style.css";
import { ContextCategory } from "../../pages/ManageCategoryPage/ManageCategoryPage";

export const AddCategoryComponent = ({ dataRecord }) => {
  const { allCategories, allSizeCategories } = useContext(ContextCategory);
  const [child_categories, setChildCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterChildCategories, setFilterChildCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [size_category,setSizeCategory]=useState("")
  const handleCheckboxChange = (id) => {
    const categorySelected = allCategories?.find(
      (category) => category?.id === id
    );
    if (categorySelected) {
      if (
        !child_categories?.find(
          (category) => category.id === categorySelected?.id
        )
      ) {
        setChildCategories((preCategories) => [
          ...preCategories,
          categorySelected,
        ]);
      } else {
        const updatedChildCategories = child_categories?.filter(
          (category) => category?.id !== categorySelected?.id
        );
        setChildCategories(updatedChildCategories);
      }
    }
  };

  const removeAllCategory = () => {
    setChildCategories([]);
    setSearchValue("");
  };
  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        category_name: categoryName,
        category_description: categoryDescription,
        child_categories: child_categories?.map((cat) => cat?.id),
        size_category:size_category
      };
    }
  }, [
    child_categories,
    dataRecord,
    categoryName,
    categoryDescription,
    size_category
  ]);
  useEffect(() => {
    if (searchValue !== "") {
      const filteredCategories = allCategories?.filter((category) =>
        category.category_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterChildCategories(filteredCategories);
    } else {
      setFilterChildCategories(allCategories);
    }
  }, [searchValue, allCategories]);
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupCategoryName">
          <Form.Label>
            Tên danh mục <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên danh mục"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDescriptions">
          <Form.Label>Mô tả danh mục</Form.Label>
          <Form.Control
            as="textarea"
            type="password"
            placeholder="Nhập mô tả danh mục"
            style={{ height: "100px" }}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationSubCategory"
            className="mb-3"
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Form.Label>
                    Danh mục con <span className="text-danger">*</span>
                  </Form.Label>
                </Accordion.Header>
                <Accordion.Body className="border-bottom">
                  <div className="selected-sizes">
                    {child_categories?.length} được chọn:{" "}
                    {child_categories?.map((category) => {
                      return category?.category_name + ", ";
                    })}
                    <Button
                      variant="outline-secondary"
                      className="clear-btn"
                      onClick={removeAllCategory}
                    >
                      Clear
                    </Button>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mb-3"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  {searchValue !== "" && (
                    <div className="text-end text-secondary">
                      {filterChildCategories?.length} kết quả
                    </div>
                  )}
                </Accordion.Body>
                <Accordion.Body
                  style={{ maxHeight: "150px", overflow: "auto" }}
                >
                  {filterChildCategories?.map((category) => {
                    return (
                      <Form.Check
                        type="checkbox"
                        key={category?.id}
                        label={`${category?.category_name} (${category?.category_description})`}
                        checked={child_categories?.some(
                          (cat) => cat?.id === category?.id
                        )}
                        onChange={() => handleCheckboxChange(category?.id)}
                      />
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Form.Group>
          <Form.Group
            style={{ maxHeight: "150px", overflow: "auto" }}
            as={Col}
            md="6"
          >
            <FloatingLabel controlId="floatingSelect" label="Kích cỡ danh mục">
              <Form.Select onChange={(e)=>setSizeCategory(e.target.value)}>
                <option >--Chọn kích cỡ danh mục--</option>
                {allSizeCategories?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.category_name}{category?.id}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};
