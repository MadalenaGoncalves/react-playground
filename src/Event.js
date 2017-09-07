import React, { PropTypes } from 'react';
import moment from 'moment';

const Event = ({item}) =>
  <div>
    <div>{moment(item.date_begin).format('DD-MM-YYYY')}</div>
    <div>{moment(item.date_begin).format('hh:mm')} - {moment(item.date_end).format('hh:mm')}
      <span>{item.group_name}</span>
      <span>total participants: {item.participants_count}</span>
      {/* <Button>Book</Button> */}
    </div>
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
