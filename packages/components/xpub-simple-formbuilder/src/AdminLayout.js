import React from 'react'
import LayoutAbstract from './core/LayoutAbstract'

class AdminLayout extends LayoutAbstract {
  render({ ui }) {
    return <p>this is a paragraph</p>
  }
}

AdminLayout.administration = true

export default AdminLayout
