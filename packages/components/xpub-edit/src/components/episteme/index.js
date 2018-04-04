import React from 'react'
import styled from 'styled-components'

import Button, { ButtonGroup } from '@atlaskit/button'

import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core'

import { MockActivityResource } from '@atlaskit/activity/dist/es5/support'

import { extensionHandlers } from './extension-handlers'

const extensionProvider = {
  editExtension: macroNode => null,
  // const index = Math.floor(Math.random() * allExtensionData.length);
  // return Promise.resolve(allExtensionData[index]);
  autoConvert: link => null,
}

export const TitleInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: red;
  }
`
TitleInput.displayName = 'TitleInput'

/**
 * +-------------------------------+
 * + [Editor core v] [Full page v] +  48px height
 * +-------------------------------+
 * +                               +  20px padding-top
 * +            Content            +
 * +                               +  20px padding-bottom
 * +-------------------------------+  ----
 *                                    88px
 */
export const Wrapper = styled.div`
  height: calc(100vh - 88px);
`
Wrapper.displayName = 'Wrapper'

export const Content = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;

  & .ProseMirror {
    & pre {
      font-family: 'Andale Mono';
      background: #000;
      padding: 20px;
      border-radius: 5px;
    }
  }
`
Content.displayName = 'Content'

// eslint-disable-next-line no-console
const analyticsHandler = (actionName, props) => console.log(actionName, props)
// eslint-disable-next-line no-console
const SAVE_ACTION = () => console.log('Save')

const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      onClick={() =>
        props.editorActions
          .getValue()
          // eslint-disable-next-line no-console
          .then(value => console.log(value))
      }
    >
      Publish
    </Button>
    <Button
      appearance="subtle"
      // eslint-disable-next-line:jsx-no-lambda
      onClick={() => props.editorActions.clear()}
    >
      Close
    </Button>
  </ButtonGroup>
)

const providers = {
  // emojiProvider: emoji.storyData.getEmojiResource({
  //   uploadSupported: true,
  // }),
  // mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  // taskDecisionProvider: Promise.resolve(
  //   taskDecision.getMockTaskDecisionResource(),
  // ),
  contextIdentifierProvider: {
    objectId: 'DUMMY',
    containerId: 'DUMMYCONTAINER',
  },
  activityProvider: Promise.resolve(new MockActivityResource()),
  extensionProvider: Promise.resolve(extensionProvider),
}
const mediaProvider = {}

export default class EpistemeEditor extends React.Component {
  state = { disabled: true }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(`To try the macro paste handler, paste one of the following links:

  www.dumbmacro.com?paramA=CFE
  www.smartmacro.com?paramB=CFE
    `)
  }

  handleTitleOnFocus = () => this.setState({ disabled: true })
  handleTitleOnBlur = () => this.setState({ disabled: false })
  handleTitleRef = ref => {
    if (ref) {
      ref.focus()
    }
  }
  render() {
    return (
      <Wrapper>
        <Content>
          <EditorContext>
            <Editor
              allowCodeBlocks
              allowDate
              allowExtension
              allowLists
              allowPanel
              allowRule
              allowTables={{
                allowColumnResizing: true,
                allowMergeCells: true,
                allowNumberColumn: true,
                allowBackgroundColor: true,
                allowHeaderRow: true,
                allowHeaderColumn: true,
                permittedLayouts: 'all',
              }}
              allowTasksAndDecisions
              allowTemplatePlaceholders={{ allowInserting: true }}
              allowTextColor
              allowUnsupportedContent
              analyticsHandler={analyticsHandler}
              appearance="full-page"
              {...providers}
              contentComponents={
                <TitleInput
                  innerRef={this.handleTitleRef}
                  // tslint:disable-next-line:jsx-no-lambda
                  onBlur={this.handleTitleOnBlur}
                  onFocus={this.handleTitleOnFocus}
                  placeholder="Give this page a title..."
                />
              }
              disabled={this.state.disabled}
              extensionHandlers={extensionHandlers}
              media={{ provider: mediaProvider, allowMediaSingle: true }}
              onSave={SAVE_ACTION}
              placeholder="Write something..."
              primaryToolbarComponents={
                <WithEditorActions
                  // tslint:disable-next-line:jsx-no-lambda
                  render={actions => (
                    <SaveAndCancelButtons editorActions={actions} />
                  )}
                />
              }
              shouldFocus={false}
            />
          </EditorContext>
        </Content>
      </Wrapper>
    )
  }
}
