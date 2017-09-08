import React, { Component } from 'react';
import moment from 'moment';
import Button from './Button';
import Event from './Event';

const DEFAULT_HAS_TAGS = 'fitness';
const DEFAULT_IS_PUBLISHED = 'true';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 2;
const DEFAULT_ORDER = 'asc';
const DEFAULT_SORT = 'date_begin';

const PATH_BASE = 'https://api-sg.sportmaps.de/api/v1/mat';
const PATH_EVENTS = '/events';
const PARAM_BEGINS_AFTER = 'begins_after=';
const PARAM_HAS_TAGS = 'has_tags%5B%5D=';
const PARAM_IS_PUBLISHED = 'is_published=';
const PARAM_PAGE = 'page=';
const PARAM_PAGE_SIZE = 'pageSize=';
const PARAM_ORDER = 'order=';
const PARAM_SORT = 'sort=';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      coaches: ['Livia', 'Andreas', 'Kristina'],
      places: ['Weinbergspark', 'Lietzensee'],
    };

    this.fetchEventsAfterDate = this.fetchEventsAfterDate.bind(this);
    this.setEvents = this.setEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEventsAfterDate((moment().format()), DEFAULT_PAGE);
  }

  fetchEventsAfterDate(dateBegin, page) {
    dateBegin = encodeURIComponent(dateBegin);
    fetch(`${PATH_BASE}${PATH_EVENTS}?${PARAM_BEGINS_AFTER}${dateBegin}&${PARAM_HAS_TAGS}${DEFAULT_HAS_TAGS}&${PARAM_IS_PUBLISHED}${DEFAULT_IS_PUBLISHED}&${PARAM_ORDER}${DEFAULT_ORDER}&${PARAM_PAGE}${page}&${PARAM_PAGE_SIZE}${DEFAULT_PAGE_SIZE}&${PARAM_SORT}${DEFAULT_SORT}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        return this.setEvents(result)
      })
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
    const { events, coaches, places } = this.state;

    const date = moment().format('YYYY-MM-DDThh:00:00');
    const page = (events && events[date] && events[date].page) || 0;
    const list = (events && events[date] && events[date].list) || [];
    const total = (events && events[date] && events[date].total) || 0;
    const retrieved = (events && events[date] && events[date].retrieved) || 0;

    return (
      <div>
        <h3>Our workouts</h3>
        {list.map( (event) =>
          <Event key={event.id} item={event} />
        )}
        {(retrieved < total) &&
          <Button onClick={() => this.fetchEventsAfterDate(date,page+1)}>Show more</Button>
        }

        <br />

        <h3>Our coaches</h3>
        <ul>
          {coaches.map( (coach) =>
            <li key={coach}>{coach}</li>
          )}
        </ul>

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

export default App;
