import React from 'react'
import { Link } from '@pubsweet/ui'

const projectUrl = ({ journal, version, page, id }) => {
  const parts = []

  parts.push('journals')
  parts.push(typeof project === 'object' ? journal.id : journal)

  if (version) {
    parts.push('versions')
    parts.push(typeof version === 'object' ? version.id : version)
  }

  if (page) {
    parts.push(page)
  }

  if (id) {
    parts.push(id)
  }

  return parts.join('/')
}

const ProjectLink = props => (
  <Link className={props.className} to={projectUrl(props)}>
    {props.children}
  </Link>
)

export default ProjectLink
