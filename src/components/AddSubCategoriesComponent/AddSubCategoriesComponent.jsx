import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { DetailCategoryContext } from "../../pages/DetailCategoryPage/DetailCategoryPage";

const AddSubCategoriesComponent = ({ dataRecord }) => {
  const { allCategories, isCheckedCategories } = useContext(
    DetailCategoryContext
  );
  const [searchValue, setSearchValue] = useState("");
  const [child_categories, setChildCategories] = useState(isCheckedCategories);
  const [filterChildCategories, setFilterChildCategories] = useState([]);
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
  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        child_categories: child_categories?.map((cat) => cat?.id),
      };
    }
  }, [child_categories, dataRecord]);
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
  const removeAllCategory = () => {
    setChildCategories([]);
    setSearchValue("");
  };
  return (
    <>
      <Form>
        <Form.Group controlId="validationSubCategory" className="mb-3">
          <Accordion defaultActiveKey="0">
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
              <Accordion.Body style={{ maxHeight: "150px", overflow: "auto" }}>
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
      </Form>
    </>
  );
};

export default AddSubCategoriesComponent;
