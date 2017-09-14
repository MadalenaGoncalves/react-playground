import React from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { Link, Route } from 'react-router-dom'
import WorkoutDetailPage from './../containers/workout-detail-page.jsx'

const divStyle = { marginRight:'10px' }

const WorkoutList = ({item}) =>
  <div style={{display:'flex', flexDirection:'row'}}>
    <div style={divStyle}>{moment(item.date_begin).format('DD-MM-YYYY')}</div>
    <div style={divStyle}>{moment(item.date_begin).format('hh:mm')} - {moment(item.date_end).format('hh:mm')}</div>

    <div style={divStyle}>{item.group_name}</div>

    <div style={divStyle}>total participants: {item.participants_count}</div>

    <div style={divStyle}>
      <Link to={`/workout/${item.id}`}>Workout details link</Link>
    </div>

    <Route
      path="/workout/:id"
      component={
        <WorkoutDetailPage test="test"
          // id={item.id}
          // group={item.group_name}
          // dateBegin={item.dateBegin}
          // dateEnd={item.dateEnd}
          // participants={item.participants}
          // onBook={item.handleBooking()}
        />}
    />

  </div>

WorkoutList.PropTypes = {
  item: PropTypes.shape({
    date_begin: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    group_name: PropTypes.string,
    participants_count: PropTypes.number,
  }),
}

export default WorkoutList;