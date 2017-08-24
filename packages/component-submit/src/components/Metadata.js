import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import { AbstractEditor, TitleEditor } from 'xpub-edit'
import { Menu, Tags } from 'xpub-ui'
import classes from './Metadata.local.css'

const Metadata = ({ journal, version, handleChange }) => (
  <form onChange={handleChange}>
    <div className={classes.section}>
      <Field
        name="title"
        id="title"
        value={version.title}
        component={props =>
          <TitleEditor
            placeholder="Enter the title…"
            title="Title"
            {...props.input}/>
        }/>
    </div>

    <div className={classes.section}>
      <Field
        name="abstract"
        id="abstract"
        value={version.abstract}
        component={props =>
          <AbstractEditor
            placeholder="Enter the abstract…"
            title="Abstract"
            {...props.input}/>
        }/>
    </div>

    <div className={classes.section}>
      <label
        className={classes.label}
        htmlFor="authors">Authors</label>
      <Field
        name="authors"
        id="authors"
        value={version.authors}
        component={props =>
          <Tags placeholder="Enter an author…" {...props.input}/>
        }/>
    </div>

    <div className={classes.section}>
      <label
        className={classes.label}
        htmlFor="keywords">Keywords</label>
      <Field
        name="keywords"
        id="keywords"
        value={version.keywords}
        component={props =>
          <Tags placeholder="Enter a keyword…" {...props.input}/>
        }/>
    </div>

    <div className={classnames(classes.section, classes.inline)}>
      <label
        className={classes.label}
        htmlFor="articleType">Type of article</label>
      <Field
        name="articleType"
        id="articleType"
        value={version.articleType}
        component={props =>
          <Menu options={journal.articleTypes} {...props.input}/>
        }/>
    </div>
  </form>
)

export default Metadata
