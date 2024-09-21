import { Pagination } from "react-bootstrap";

export const handleFirst = (
  navigate,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,isOrders
) => {
  if (isCategory) {
    if (search !== "")
      navigate(
        `/admin/category/?page=${1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/category/?page=${1}`);
  }
  if (isSizeCategory) {
    if (search !== "")
      navigate(
        `/admin/size_category/?page=${1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/size_category/?page=${1}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/product/?page=${1}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/product/?page=${1}`);
  }
  if (isOrders) {
    if (search !== "")
      navigate(
        `/admin/orders/?page=${1}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/orders/?page=${1}`);
  }
  if (isProductItems && id) {
    if (search !== "")
      navigate(
        `/admin/product/detailProduct/${id}/?page=${1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/product/detailProduct/${id}?page=${1}`);
  }
};
export const handleLast = (
  navigate,
  numPage,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,
  isOrders
) => {
  if (isCategory) {
    if (search !== "")
      navigate(
        `/admin/category/?page=${numPage}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/category/?page=${numPage}`);
  }
  if (isSizeCategory) {
    if (search !== "")
      navigate(
        `/admin/size_category/?page=${numPage}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/size_category/?page=${numPage}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${numPage}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/product/?page=${numPage}`);
  }
  if (isOrders) {
    if (search !== "")
      navigate(
        `/admin/orders/?page=${numPage}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/orders/?page=${numPage}`);
  }
  if (isProductItems && id) {
    if (search !== "")
      navigate(
        `/admin/product/detailProduct/${id}?page=${numPage}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/product/detailProduct/${id}?page=${numPage}`);
  }
};
export const handlePageChange = (
  pageIndex,
  navigate,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,
  isOrders
) => {
  if (isCategory) {
    if (search !== "")
      navigate(
        `/admin/category/?page=${pageIndex}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/category/?page=${pageIndex}`);
  }
  if (isSizeCategory) {
    if (search !== "")
      navigate(
        `/admin/size_category/?page=${pageIndex}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/size_category/?page=${pageIndex}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/product/?page=${pageIndex}`);
  }
  if (isOrders) {
    if (search !== "")
      navigate(
        `/admin/orders/?page=${pageIndex}&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/orders/?page=${pageIndex}`);
  }
  if (isProductItems && id) {
    if (search !== "")
      navigate(
        `/admin/product/detailProduct/${id}?page=${pageIndex}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/product/detailProduct/${id}?page=${pageIndex}`);
  }
};
export const handlePagePrevious = (
  pagesCurrent,
  navigate,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,isOrders

) => {
  if (isCategory) {
    if (search !== "")
      navigate(
        `/admin/category/?page=${pagesCurrent - 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/category/?page=${pagesCurrent - 1}`);
  }
  if (isSizeCategory) {
    if (search !== "")
      navigate(
        `/admin/size_category/?page=${
          pagesCurrent - 1
        }&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/size_category/?page=${pagesCurrent - 1}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${pagesCurrent - 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/product/?page=${pagesCurrent - 1}`);
  }
  if (isOrders) {
    if (search !== "")
      navigate(
        `/admin/orders/?page=${pagesCurrent - 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/orders/?page=${pagesCurrent - 1}`);
  }
  if (isProductItems && id) {
    if (search !== "")
      navigate(
        `/admin/product/detailProduct/${id}?page=${
          pagesCurrent - 1
        }&search=${encodeURIComponent(search)}`
      );
    else
      navigate(`/admin/product/detailProduct/${id}?page=${pagesCurrent - 1}`);
  }
};
export const handlePageNext = (
  pagesCurrent,
  navigate,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,isOrders

) => {
  if (isCategory) {
    if (search !== "")
      navigate(
        `/admin/category/?page=${pagesCurrent + 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/category/?page=${pagesCurrent + 1}`);
  }
  if (isSizeCategory) {
    if (search !== "")
      navigate(
        `/admin/size_category/?page=${
          pagesCurrent + 1
        }&search=${encodeURIComponent(search)}`
      );
    else navigate(`/admin/size_category/?page=${pagesCurrent + 1}`);
  }
  if (isProduct) {
    if (search !== "")
      navigate(
        `/admin/product/?page=${pagesCurrent + 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/product/?page=${pagesCurrent + 1}`);
  }
  if (isOrders) {
    if (search !== "")
      navigate(
        `/admin/orders/?page=${pagesCurrent + 1}&search=${encodeURIComponent(
          search
        )}`
      );
    else navigate(`/admin/orders/?page=${pagesCurrent + 1}`);
  }
  if (isProductItems && id) {
    if (search !== "")
      navigate(
        `/admin/product/detailProduct/${id}?page=${
          pagesCurrent + 1
        }&search=${encodeURIComponent(search)}`
      );
    else
      navigate(`/admin/product/detailProduct/${id}?page=${pagesCurrent + 1}`);
  }
};
export const renderPaginationItems = (
  pageNumbers,
  pagesCurrent,
  numPage,
  navigate,
  search,
  isCategory,
  isSizeCategory,
  isProduct,
  isProductItems,
  id,
  isOrders
) => {
  const maxVisiblePage = 5;
  if (pageNumbers?.length <= maxVisiblePage) {
    return pageNumbers?.map((index) => (
      <Pagination.Item
        key={index}
        active={pagesCurrent === index + 1}
        onClick={() =>
          handlePageChange(
            index + 1,
            navigate,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,isOrders
          )
        }
      >
        {index + 1}
      </Pagination.Item>
    ));
  }
  const firstPage = Math.max(pagesCurrent - Math.floor(maxVisiblePage / 2), 1);
  const lastPage = Math.min(
    pagesCurrent + Math.floor(maxVisiblePage / 2),
    numPage
  );
  const items = [];
  if (firstPage > 1) {
    items.push(
      <Pagination.Ellipsis
        key={"start"}
        disabled
        style={{ cursor: "not-allowed" }}
      />
    );
  }

  for (let i = firstPage; i <= lastPage; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={pagesCurrent === i}
        onClick={() =>
          handlePageChange(
            i,
            navigate,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,isOrders
          )
        }
      >
        {i}
      </Pagination.Item>
    );
  }

  if (lastPage < numPage) {
    items.push(
      <Pagination.Ellipsis
        key={"end"}
        disabled
        style={{ cursor: "not-allowed" }}
      />
    );
  }

  return items;
};
