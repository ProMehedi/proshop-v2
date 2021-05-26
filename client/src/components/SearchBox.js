import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history, match }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query.trim()) {
      history.push(`/search/${query}`)
    } else {
      if (history.location.pathname.includes('search')) {
        history.push('/')
      }
    }
  }, [history, query])

  return (
    <>
      <Form className='d-flex align-items-center searchForm'>
        <input
          type='search'
          className='mr-sm-2 ml-sm-5'
          name='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search Products...'
        />
        {/* <Button type='submit' variant='primary'>
          <i className='fas fa-search'></i>
        </Button> */}
      </Form>
    </>
  )
}

export default SearchBox
