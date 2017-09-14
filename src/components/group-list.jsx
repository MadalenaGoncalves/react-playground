import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

const divStyle = { marginRight:'10px' }

const GroupList = ({item}) => {
  console.log('@GroupList', item);
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <div style={divStyle}>{item.name}</div>
      <div style={divStyle}>at {item.place_name}, {item.place_district_code}</div>

      <div style={divStyle}>
        <Link to={`/group/${item.id}`}>Group details link</Link>
      </div>
    </div>
  )

}
GroupList.PropTypes = {
  item: PropTypes.shape({
    date_begin: PropTypes.string.isRequired,
    date_end: PropTypes.string,
    group_name: PropTypes.string,
    participants_count: PropTypes.number,
  }),
}

export default GroupList;
