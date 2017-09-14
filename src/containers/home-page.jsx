import React, { Component } from 'react';
import moment from 'moment';
import Button from './../components/common/button.jsx';
import WorkoutList from './../components/workout-list.jsx';
import GroupList from './../components/group-list.jsx'
import {
  PATH_BASE,
  PATH_EVENTS,
  PATH_GROUPS,
  PARAM_BEGINS_AFTER,
  PARAM_HAS_TAGS,
  PARAM_IS_PUBLISHED,
  PARAM_PAGE,
  PARAM_PAGE_SIZE,
  PARAM_ORDER,
  PARAM_SORT,
  DEFAULT_HAS_TAGS,
  DEFAULT_IS_PUBLISHED,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_ORDER,
} from './../config'
const EVENT_SORT = 'date_begin';
const GROUP_SORT = 'rank';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      groups: null,
      coaches: ['Livia', 'Andreas', 'Kristina'],
      places: ['Weinbergspark', 'Lietzensee'],
    };

    this.fetchEventsAfterDate = this.fetchEventsAfterDate.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
    this.setGroups = this.setGroups.bind(this);
  }

  componentDidMount() {
    this.fetchEventsAfterDate((moment().format()), DEFAULT_PAGE);
    this.fetchGroups();
  }

  fetchGroups() {
    try {
      fetch(`${PATH_BASE}${PATH_GROUPS}?${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}&${PARAM_ORDER}${DEFAULT_ORDER}&${PARAM_SORT}${GROUP_SORT}`)
        .then(response => response.json())
        .then(result => { console.log('@fetchGroups',result); return this.setGroups(result)})
    }
    catch(e) {
      console.log('Error @fetchGroups ', e);
    }
  }

  setGroups(result) {
    console.log('@setGroups',result);
    this.setState({ groups: result.groups });
    console.log('State', this.state.groups);
  }

  fetchEventsAfterDate(dateBegin, page) {
    dateBegin = encodeURIComponent(dateBegin);
    try {
      fetch(`${PATH_BASE}${PATH_EVENTS}?${PARAM_BEGINS_AFTER}${dateBegin}&${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}&${PARAM_ORDER}${DEFAULT_ORDER}&${PARAM_PAGE}${page}&${PARAM_PAGE_SIZE}${DEFAULT_PAGE_SIZE}&${PARAM_SORT}${EVENT_SORT}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        return this.setEvents(result)
      })
    }
    catch(e) {
      console.log('Error @fetchEventsAfterDate ', e);
    }
  }

  setEvents(result) {
    console.log('@setEvents',result);

    const { events, meta } = result;
    const date = moment().format('YYYY-MM-DDThh:00:00');
    const oldEvents = this.state.events && this.state.events[date] ? this.state.events[date].list : [];

    const updatedEvents = [...oldEvents,...events];

    this.setState({
      events: {
        ...events,
        [date]: {
          list : updatedEvents,
          page: meta.page,
          total: meta.rowCount,
          retrieved: meta.pageSize*meta.page,
        },
      }
    });
  }

  render() {
    const { events, coaches, places, groups } = this.state;
    const date = moment().format('YYYY-MM-DDThh:00:00');
    const page = (events && events[date] && events[date].page) || 0;
    const event_list = (events && events[date] && events[date].list) || [];
    const total = (events && events[date] && events[date].total) || 0;
    const retrieved = (events && events[date] && events[date].retrieved) || 0;
    const group_list = groups || [];

    return (
      <div>
        <h3>Our Workouts</h3>
        {event_list.map( (event, index) =>
          <WorkoutList key={index} item={event} />
        )}
        {(retrieved < total) &&
          <Button onClick={() => this.fetchEventsAfterDate(date,page+1)}>Show more</Button>
        }

        <br />

        <h3>Our Groups</h3>
        {group_list.map( (group) =>
          <GroupList key={group.id} item={group} />
        )}

        <br />

        <h3>Our Coaches</h3>
        <ul>
          {coaches.map( (coach) =>
            <li key={coach}>{coach}</li>
          )}
        </ul>

        <br />

        <h3>Our Spots</h3>
        <ul>
          {places.map( (place) =>
            <li key={place}>{place}</li>
          )}
        </ul>

      </div>
    );
  }
}
