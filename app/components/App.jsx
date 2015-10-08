import React from 'react'
import AltContainer from 'alt/AltContainer'
import ManageStore from '../stores/ManageStore'
import CreateStore from '../stores/CreateStore'
import CreateAPI from '../utils/CreateAPI'
import ManageAPI from '../utils/ManageAPI'
import Navigation from '../components/Navigation'
import alt from '../altInstance'
import _ from 'lodash'
import '../scss/main'

/*
 * This component operates as a "Controller-View". It listens for changes in the
 * Store and passes the new data to its children.
 *
 * React provides the kind of composable views we need for the view layer. Close to the top of the nested view hierarchy,
 * a special kind of view listens for events that are broadcast by the stores that it depends on. One could call this a
 * controller-view, as it provides the glue code to get the data from the stores and to pass this data down the chain of its
 * descendants. We might have one of these controller views governing any significant section of the page.
 *
 * When it receives an event from the store, it first requires the new data via the store's public getter methods. It then calls
 * its own setState() or forceUpdate() methods, causing its own render() method and the render() method of all its descendants to run.
 *
 * We often pass the entire state of the store down the chain of views in a single object, allowing different descendants to use
 * what they need. In addition to keeping the controller-like behavior at the top of the hierarchy, and thus keeping our descendant
 */

export default class App extends React.Component {
  componentWillMount () {
    let manages = ManageAPI.getManages()
    let creates = CreateAPI.getCreates()

    Promise.all([manages, creates]).then(function (results) {
      results[0] = _.indexBy(results[0], 'id')
      results[1] = _.indexBy(results[1], function (object) {
        return object.data.manageId
      })
      alt.bootstrap(JSON.stringify({
        ManageStore: { manages: results[0] },
        CreateStore: { creates: results[1] }
      }))
    })
  }

  render () {
    return (
      <AltContainer stores={{
        ManageStore: ManageStore,
        CreateStore: CreateStore
      }}>
        <Navigation />
        {this.props.children}
      </AltContainer>
    )
  }
}

App.propTypes = { children: React.PropTypes.object }
