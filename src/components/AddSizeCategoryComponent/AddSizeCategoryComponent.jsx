import React, { useEffect, useState } from "react";
import { Accordion, Button, Collapse, Form } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
const AddSizeCategoryComponent = ({ dataRecord }) => {
  const [categoryName, setCategoryName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [size_options, setSizeOptions] = useState([]);
  const [sizeOptionValue, setSizeOptionValue] = useState("");
  const [filterSizeOptions, setFilterSizeOptions] = useState([]);
  const [sizeOptonsSelected, setSizeOptionsSelected] = useState([]);
  const [error, setError] = useState("");
  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd);
  };
  const handleAddSizeOption = () => {
    if (!size_options?.find((size_option) => size_option === sizeOptionValue)) {
      setSizeOptions((prev) => [...prev, sizeOptionValue]);
      setError("");
    } else {
      setError("Loại kích cỡ đã tồn tại");
    }
  };
  const handleCheckboxChange = (sizeOption) => {
    if (sizeOption) {
      if (
        !sizeOptonsSelected?.find((size_option) => size_option === sizeOption)
      ) {
        setSizeOptionsSelected((preSizeOption) => [
          ...preSizeOption,
          sizeOption,
        ]);
      } else {
        const updatedSizeOptions = sizeOptonsSelected?.filter(
          (size_option) => size_option !== sizeOption
        );
        setSizeOptionsSelected(updatedSizeOptions);
      }
    }
  };
  
  const removeAllSizeOptionSelected = () => {
    const updatedSizeOptions = size_options?.filter(
      (size_option) => !sizeOptonsSelected.includes(size_option)
    );
    setSizeOptions(updatedSizeOptions);
    setSizeOptionsSelected([]);
  };
  
  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        category_name: categoryName,
        size_options: size_options,
      };
    }
  }, [size_options, dataRecord, categoryName]);


  useEffect(() => {
    if (searchValue !== "") {
      const filteredSizeOptions = size_options?.filter((size_option) =>
        size_option.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterSizeOptions(filteredSizeOptions);
    } else {
      setFilterSizeOptions(size_options);
    }
  }, [searchValue, size_options]);
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
        <Form.Group className="mb-3" controlId="formGroupCategoryName">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Form.Label>
                  Danh sách kích cỡ <span className="text-danger">*</span>
                </Form.Label>
              </Accordion.Header>
              <Accordion.Body className="border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="outline-secondary"
                    className="clear-btn"
                    onClick={removeAllSizeOptionSelected}
                    disabled={sizeOptonsSelected?.length < 1}
                  >
                    Xóa
                  </Button>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    {showFormAdd ? (
                      <Button
                        variant="outline-dark"
                        // className="clear-btn"
                        size="sm"
                        onClick={() => {
                          handleShowFormAdd();
                          setSizeOptionValue("");
                        }}
                      >
                        Ẩn
                      </Button>
                    ) : null}
                    <Collapse in={showFormAdd} dimension="width">
                      <Form.Group
                        className=""
                        controlId="formGroupSizeOptionName"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Nhập loại kích cỡ danh mục"
                          value={sizeOptionValue}
                          onChange={(e) => setSizeOptionValue(e.target.value)}
                          style={{ width: "225px" }}
                        />
                      </Form.Group>
                    </Collapse>
                    {!showFormAdd ? (
                      <Button
                        variant="dark"
                        className="clear-btn"
                        onClick={handleShowFormAdd}
                      >
                        <IoAddOutline />
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={handleAddSizeOption}
                      >
                        Thêm
                      </Button>
                    )}
                  </div>
                </div>
                {error ? (
                  <div className="d-flex justify-content-end align-items-center pe-5">
                    <p style={{ margin: 0 }} className=" text-danger pe-5 me-4">
                      {" "}
                      {error}
                    </p>
                  </div>
                ) : null}
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="mb-3 mt-3"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {/* {searchValue !== "" && (
                  <div className="text-end text-secondary">
                    {filterChildCategories?.length} kết quả
                  </div>

                )} */}
                {sizeOptonsSelected?.length} được chọn:{" "}
                {sizeOptonsSelected?.map((size_option) => {
                  return size_option + ", ";
                })}
              </Accordion.Body>
              <Accordion.Body style={{ maxHeight: "150px", overflow: "auto" }}>
                {filterSizeOptions?.map((size_option, index) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      key={index}
                      label={size_option}
                      checked={sizeOptonsSelected?.some(
                        (option) => option === size_option
                      )}
                      onChange={() => handleCheckboxChange(size_option)}
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

export default AddSizeCategoryComponent;
