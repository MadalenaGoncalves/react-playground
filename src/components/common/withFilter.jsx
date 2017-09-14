import React from 'react'

const withFilter = (WrappedComponent, filterList, onChange) => {
  return (props) =>
    <div>
      <div>
        <button onClick={onChange}>All</button>
        {filterList.map((item) =>
          <button key={item.value} value={item.value} onClick={onChange}>{item.label}</button>
        )}
      </div>
      <WrappedComponent {...props} />
    </div>
}

export default withFilter;
