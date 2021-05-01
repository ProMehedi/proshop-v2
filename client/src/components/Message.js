import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, classes }) => {
  return (
    <div className={`alert-container ${classes}`}>
      <Alert variant={variant}>{children}</Alert>
    </div>
  )
}

Message.defaultProps = {
  variant: 'primary',
  classes: 'alert-container text-uppercase',
}

export default Message
