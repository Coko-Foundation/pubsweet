import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ShareItem from 'components/ShareItem'

export default class Share extends React.Component {

  render () {
    const shares = this.props.CreateStore.creates.toKeyedSeq().map((create, key) => {
      return (<ShareItem key={create.get('id')} content={create.getIn(['data', 'content'])} />)
    }).toArray()
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            {shares}
          </Col>
        </Row>
      </Grid>
    )
  }
}

Share.propTypes = {
  CreateStore: React.PropTypes.object
}
