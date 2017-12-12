import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import FormGroup from 'pubsweet-component-form-group/FormGroup'
import mergeValidations from 'pubsweet-server/src/models/validations'
import config from 'config'

const appValidationsPath = config.validations
const validations = mergeValidations(require(appValidationsPath))

export default class PostCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave (text) {
    const title = this.titleInputNode.value

    if (title !== '') {
      this.props.create({
        fragmentType: 'blogpost',
        title,
        published: false
      })
    }

    this.titleInputNode.blur()
  }
  render () {
    return (
      <div>
        <h3>Create a new blog post</h3>
        <FormGroup
          controlId='fragment.title'
          label='Title'
          placeholder='One fine day...'
          validations={validations}
          modelProperty='fragment.title'
          inputRef={(input) => { this.titleInputNode = input }}
        />
        <Button bsStyle='primary' onClick={this.onSave} title='Create' aria-label='Create'>
          <i className='fa fa-plus' /> Create
        </Button>
      </div>
    )
  }
}
PostCreator.propTypes = {
  create: PropTypes.func
}