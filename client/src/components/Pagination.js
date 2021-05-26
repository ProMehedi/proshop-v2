import React from 'react'
import { Pagination as ReactPagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Pagination = ({ pages, page, isAdmin = false, query = '' }) => {
  return (
    page > 1 && (
      <ReactPagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin
                ? query
                  ? `/admin/products/search/${query}/page/${x + 1}`
                  : `/admin/products/${x + 1}`
                : query
                ? `/search/${query}/${x + 1}`
                : `/page/${x + 1}`
            }
          >
            <ReactPagination.Item active={x + 1 === page}>
              {x + 1}
            </ReactPagination.Item>
          </LinkContainer>
        ))}
      </ReactPagination>
    )
  )
}

export default Pagination
