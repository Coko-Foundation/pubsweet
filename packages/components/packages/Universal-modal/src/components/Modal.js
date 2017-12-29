import React, { Component } from 'react'
import Modal from 'react-modal'
import config from 'config'
import * as actions from '../actions'
import HeaderModal from './HeaderModal'
import FooterModal from './FooterModal'

let mountedInstance = {}

class UniversalModal extends Component {
  constructor() {
    super()
    const rootElem = config['pubsweet-component-universal-modal']['rootElem']
    Modal.setAppElement(rootElem)
  }

  componentDidMount() {
    this.components = []
    mountedInstance = this
  }

  modalActions() {
    return args => this.props.dispatch(actions.toggleModal(args))
  }

  render() {
    const modalInstances = this.props.modal
    let BodyTemplate = null
    let HeaderTemplate = HeaderModal
    let FooterTemplate = FooterModal
    return (
      <div>
        {modalInstances.map((instance, index) => {
          const RenderModalTemplate = mountedInstance.components.find(
            elem => elem.name === instance.component,
          )

          if (RenderModalTemplate) {
            BodyTemplate = RenderModalTemplate.layout.body || null
            HeaderTemplate = RenderModalTemplate.layout.header || HeaderModal
            FooterTemplate = RenderModalTemplate.layout.footer || FooterModal
          }

          return BodyTemplate ? (
            <Modal
              contentLabel={instance.contentLabel}
              isOpen={instance.isOpen}
              key={`'modal-'index`}
            >
              <HeaderTemplate
                title={instance.title}
                toggleModal={this.modalActions(this.props)}
              />
              <BodyTemplate toggleModal={this.modalActions(this.props)} />
              <FooterTemplate toggleModal={this.modalActions(this.props)} />
            </Modal>
          ) : null
        })}
      </div>
    )
  }
}

UniversalModal.addComponent = (name, ModalComponent) => {
  const obj = {
    name,
    layout: ModalComponent,
  }
  mountedInstance.components.push(obj)
}

export default UniversalModal
