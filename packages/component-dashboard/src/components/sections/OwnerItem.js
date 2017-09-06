import React from 'react'
import Status from '../Status'
import classes from './Item.local.scss'
import ProjectLink from '../ProjectLink'
import { LinksDivider } from './Dividers'

const OwnerItem = ({ project, version, deleteProject }) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <Status status={project.status}/>
    </div>

    <div className={classes.main}>
      <div className={classes.title}>
        {project.title || 'Untitled'}
      </div>

      <div className={classes.links}>
        <div className={classes.link}>
          <ProjectLink
            project={project}
            version={version}
            page="submit">Submission</ProjectLink>
        </div>

        <LinksDivider/>

        <div className={classes.link}>
          <ProjectLink
            project={project}
            version={version}
            page="manuscript">Manuscript</ProjectLink>
        </div>
      </div>

      <div className={classes.actions}>
        <div className={classes.action}>
          <button onClick={() => deleteProject({id: project.id})}>x</button>
        </div>
      </div>
    </div>
  </div>
)

export default OwnerItem
