import React from 'react'
// import { PropTypes } from 'prop-types'
import moment from 'moment'
import Button from './../components/common/button.jsx'


const WorkoutDetailPage = (props) => {
  const id = props.match.params.id;
  return (
    <div>
      <p>{id}</p>
      <p>{props.test}</p>
      {/* <div>Group: {props.group}</div>
      <div>Date: {moment(props.dateBegin).format('DD-MM-YYYY')}</div>
      <div>Time: {moment(props.dateBegin).format('hh:mm')} - {moment(props.dateEnd).format('hh:mm')}</div>
      <div>Participants: {props.participants}</div> */}
      {/* <div><Button onClick={onBook}>Book</Button></div> */}
    </div>
  );
}

export default WorkoutDetailPage
