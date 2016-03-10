import React from 'react'
import styles from '../../scss/components/_about'
import { Row, Col } from 'react-bootstrap'

export default class About extends React.Component {
  render () {
    return (
      <div className='bootstrap'>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <h1 className={styles.about__header}>About Pubsweet</h1>
            <p className={styles.about__description}>Sweet!</p>
          </Col>
        </Row>
      </div>
    )
  }
}
