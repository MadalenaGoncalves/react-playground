import React from 'react'
// import { PropTypes } from 'prop-types'
import moment from 'moment'
import Button from './../components/common/button.jsx'
import { PATH_BASE, PATH_EVENT } from './../config.js'

class WorkoutDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      group: '',
      date_begin: '',
      date_end: '',
      participants: '',
    };
    this.handleBooking = this.handleBooking.bind(this);
  }

  componentDidMount() {
    this.fetchEvent(this.state.id);
  }

  fetchEvent(id) {
    try {
      const requestURL = `${PATH_BASE}${PATH_EVENT}?id=${this.state.id}`;
      fetch(requestURL)
        .then(response => response.json())
        .then(result => {
          const event = result.events.filter((e) => e.event_id === this.state.id)[0];
          return this.setEvent(event);
        })
    }
    catch(e) {
      console.log('Error @fetchEvent ', e);
    }
  }

  setEvent(ev) {
    console.log('@setEvent', ev);
    this.setState({
      group: ev.group_name,
      date_begin: ev.date_begin,
      date_end: ev.date_end,
      participants: ev.participants_count,
    })
  }

  handleBooking() {
    console.log("Book button clicked");
  }

  render() {
    const {
      id,
      group,
      dateBegin,
      dateEnd,
      participants
    } = this.state;
    return (
      <div>
        <p>{id}</p>
        <div>Group: {group}</div>
        <div>Date: {moment(dateBegin).format('DD-MM-YYYY')}</div>
        <div>Time: {moment(dateBegin).format('hh:mm')} - {moment(dateEnd).format('hh:mm')}</div>
        <div>Participants: {participants}</div>
        <div><Button onClick={this.handleBooking}>Book</Button></div>
      </div>
    );
  }
}

export default WorkoutDetailPage
