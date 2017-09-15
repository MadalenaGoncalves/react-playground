import React from 'react'
import { PATH_BASE, PATH_GROUP } from 'config.js'

class GroupDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      name: '',
    };
    this.handleBooking = this.handleBooking.bind(this);
  }

  componentDidMount() {
    this.fetchGroup(this.state.id);
  }

  fetchGroup(id) {
    fetch(`${PATH_BASE}${PATH_GROUP}?id=${this.state.id}`)
      .then(response => response.json())
      .then(result => {
        const group = result.groups.filter((g) => g.group_id === this.state.id)[0];
        return this.setGroup(group);
      })
  }

  setGroup(group) {
    console.log('@setGroup', group);
    this.setState({
      group: group.group_name,
    })
  }

  render() {
    const {
      id,
      name,
    } = this.state;
    return (
      <div>
        <p>{id}</p>
        <div>Group: {name}</div>
      </div>
    );
  }
}

export default GroupDetailPage
