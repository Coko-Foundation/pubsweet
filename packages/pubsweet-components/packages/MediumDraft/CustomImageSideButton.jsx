import {
  ImageSideButton,
  Block,
  addNewBlock
} from 'medium-draft'

export default function customImageSideButton (fileUpload) {
  class CustomImageSideButton extends ImageSideButton {
    onChange (e) {
      const file = e.target.files[0]
      if (file.type.indexOf('image/') === 0) {
        // This is a post request to server endpoint with image as `image`

        fileUpload(file).then((response) => {
          this.props.setEditorState(addNewBlock(
            this.props.getEditorState(),
            Block.IMAGE, {
              src: response.file
            }
          ))
        })
      }
      this.props.close()
    }
  }

  return CustomImageSideButton
}
