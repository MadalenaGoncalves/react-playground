import React, { Component } from 'react';
import moment from 'moment';
import Button from 'components/common/Button';
import WorkoutListItem from 'components/ListItem/WorkoutListItem';
import GroupListItem from 'components/ListItem/GroupListItem'
import withFilter from 'components/common/withFilter'
import {
  PATH_BASE,
  PATH_EVENTS,
  PATH_GROUPS,
  PARAM_BEGINS_AFTER,
  PARAM_HAS_TAGS,
  PARAM_IS_PUBLISHED,
  PARAM_DISTRICT,
  PARAM_PAGE,
  PARAM_PAGE_SIZE,
  PARAM_ORDER,
  PARAM_SORT,
  DEFAULT_HAS_TAGS,
  DEFAULT_IS_PUBLISHED,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_ORDER,
} from 'containers/constants'
const EVENT_SORT = 'date_begin';
const GROUP_SORT = 'rank';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    let initialData;
    if (props.staticContext) {
      initialData = props.staticContext.initialData;
    }
    else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }

    this.state = {
      events: null,
      groups: null,
      coaches: ['Livia', 'Andreas', 'Kristina'],
      places: ['Weinbergspark', 'Lietzensee'],
    };

    this.fetchEvents = this.fetchEvents.bind(this);
    this.setEvents = this.setEvents.bind(this);
    // this.fetchGroups = this.fetchGroups.bind(this);
    // this.setGroups = this.setGroups.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  setEventInitialState = (initialData) => {
    const { events, meta } = initialData;
    const date = moment().format('YYYY-MM-DDThh:00:00');
    const oldEvents = this.state.events && this.state.events[date] ? this.state.events[date].list : [];

    const updatedEvents = [...oldEvents,...events];

    return {
      [date]: {
        list : updatedEvents,
        page: meta.page,
        total: meta.rowCount,
        retrieved: meta.pageSize*meta.page,
      },
    };
  }

  componentDidMount() {
    // this.fetchEvents((moment().format()), DEFAULT_PAGE);
    // this.fetchGroups();
    console.log("running componentDidMount");
    HomePage.requestInitialData()
      .then(result => {
        console.log("received data", result);
        return this.setEvents(result)
      })
  }

  static requestInitialData() {
    const dateBegin = encodeURIComponent(moment().format());
    const page = DEFAULT_PAGE;
    let requestURL = `${PATH_BASE}${PATH_EVENTS}`
      + `?${PARAM_BEGINS_AFTER}${dateBegin}`
      + `&${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}`
      + `&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}`
      + `&${PARAM_ORDER}${DEFAULT_ORDER}`
      + `&${PARAM_PAGE}${page}`
      + `&${PARAM_PAGE_SIZE}${DEFAULT_PAGE_SIZE}`
      + `&${PARAM_SORT}${EVENT_SORT}`;

    return fetch(requestURL)
      .then(response => response.json())
  }

  fetchEvents(dateBegin, page) {
    dateBegin = encodeURIComponent(dateBegin);
    let requestURL = `${PATH_BASE}${PATH_EVENTS}`
      + `?${PARAM_BEGINS_AFTER}${dateBegin}`
      + `&${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}`
      + `&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}`
      + `&${PARAM_ORDER}${DEFAULT_ORDER}`
      + `&${PARAM_PAGE}${page}`
      + `&${PARAM_PAGE_SIZE}${DEFAULT_PAGE_SIZE}`
      + `&${PARAM_SORT}${EVENT_SORT}`;

    try {
      fetch(requestURL)
      .then(response => response.json())
      // .then(result => this.setEvents(result))
    }
    catch(e) {
      console.log('Error @fetchEvents ', e);
    }
  }

  setEvents(result) {
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

  // fetchGroups() {
  //   try {
  //     fetch(`${PATH_BASE}${PATH_GROUPS}?${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}&${PARAM_ORDER}${DEFAULT_ORDER}&${PARAM_SORT}${GROUP_SORT}`)
  //       .then(response => response.json())
  //       .then(result => this.setGroups(result))
  //   }
  //   catch(e) {
  //     console.log('Error @fetchGroups ', e);
  //   }
  // }
  //
  // setGroups(result) {
  //   this.setState({ groups: result.groups });
  // }

  fetchEventsByDistrict(dateBegin, page, district = null) {
    dateBegin = encodeURIComponent(dateBegin);
    let requestURL = `${PATH_BASE}${PATH_EVENTS}`
      + `?${PARAM_BEGINS_AFTER}${dateBegin}`
      + `&${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}`
      + `&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}`
      + `&${PARAM_ORDER}${DEFAULT_ORDER}`
      + `&${PARAM_PAGE}${page}`
      + `&${PARAM_PAGE_SIZE}${DEFAULT_PAGE_SIZE}`
      + `&${PARAM_SORT}${EVENT_SORT}`;

    if(district) {
      console.log("here");
      requestURL = `${requestURL}&${PARAM_DISTRICT}${district}`
    }

    try {
      fetch(requestURL)
      .then(response => response.json())
      .then(result => this.resetEvents(result))
    }
    catch(e) {
      console.log('Error @fetchEventsByDistrict ', e);
    }
  }

  resetEvents(result) {
    const { events, meta } = result;
    const date = moment().format('YYYY-MM-DDThh:00:00');

    this.setState({
      events: {
        ...events,
        [date]: {
          list : events,
          page: meta.page,
          total: meta.rowCount,
          retrieved: meta.pageSize*meta.page,
        },
      }
    });
  }

  onChangeFilter(event) {
    console.log('onChangeFilter', event.target, event.target.value);
    const district = event.target.value;
    this.fetchEventsByDistrict((moment().format()),DEFAULT_PAGE,district);
  }

  render() {
    const { events, coaches, places /*, groups*/ } = this.state;
    const date = moment().format('YYYY-MM-DDThh:00:00');
    const page = (events && events[date] && events[date].page) || 0;
    const eventList = (events && events[date] && events[date].list) || [];
    const total = (events && events[date] && events[date].total) || 0;
    const retrieved = (events && events[date] && events[date].retrieved) || 0;
    // const groupList = groups || [];

    const filterList = [
      { value: 'mitte', label: 'Mitte' },
      { value: 'charlottenburg', label: 'Charlottenburg-Wilmersdorf' },
    ];
    // const WorkoutList =
    //   <div>
    //     {eventList.map( (event, index) =>
    //       <WorkoutListItem key={index} item={event} />
    //     )}
    //     {(retrieved < total) &&
    //       <Button onClick={() => this.fetchEvents(date,page+1)}>Show more</Button>
    //     }
    //   </div>;

    return (
      <div>
        <h3>Our Workouts</h3>
        {/* {withFilter(WorkoutList, filterList, onChangeFilter)} */}
        <div>
          <button onClick={this.onChangeFilter}>All</button>
          {filterList.map((item) =>
            <button key={item.value} value={item.value} onClick={this.onChangeFilter}>{item.label}</button>
          )}
        </div>
        {eventList.map((event, index) =>
          <WorkoutListItem key={index} item={event} />
        )}
        {(retrieved < total) &&
          <Button onClick={() => this.fetchEvents(date,page+1)}>Show more</Button>
        }

        <br />

        {/* <h3>Our Groups</h3>
        {groupList.map( (group) =>
          <GroupListItem key={group.id} item={group} />
        )} */}

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
