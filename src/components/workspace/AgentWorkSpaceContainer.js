import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {requestWorker} from '../../actions'

import AgentWorkSpace from './AgentWorkSpace'


class AgentWorkSpaceContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // When this top level component loads get the worker sid from the URL
    const { dispatch } = this.props
    var url = new URL(window.location.href)
    dispatch(requestWorker(url.searchParams.get("worker")))
  }

  componentWillUnmount() {
    console.log("UNMOUNTING")
  }


  render() {
    const { channels, participant, error, errorMessage } = this.props
    let current = "default"

    return (
    	<AgentWorkSpace channels={channels} currInteraction={current} participant={participant} error={error} errorMessage={errorMessage}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.taskrouter.channels,
    participant: state.chat.videoParticipant,
    error: state.taskrouter.error,
    errorMessage: state.taskrouter.errorMessage
  }
}


export default connect(mapStateToProps)(AgentWorkSpaceContainer)
