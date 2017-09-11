import React from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
// import { Link } from 'react-router-dom'

const Event = ({item}) =>
  <div style={{display:'flex', flexDirection:'row'}}>
    <div style={{marginRight:'10px'}}>{moment(item.date_begin).format('DD-MM-YYYY')}</div>
    <div style={{marginRight:'10px'}}>{moment(item.date_begin).format('hh:mm')} - {moment(item.date_end).format('hh:mm')}</div>
    <div style={{marginRight:'10px'}}>{item.group_name}</div>
    <div style={{marginRight:'10px'}}>total participants: {item.participants_count}</div>
    {/* <Link to={}>see details</Link> */}
  </div>

Event.PropTypes = {
  item: PropTypes.shape({
    date_begin: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    group_name: PropTypes.string,
    participants_count: PropTypes.number,
  }),
}

export default Event;
