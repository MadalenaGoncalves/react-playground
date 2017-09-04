import React, { Component, PropTypes } from 'react';
import './App.css';
import moment from 'moment';

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
      .then(result => this.setEvents(result));
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
        }
      }
    });

  }


  render() {
    const date = moment().format('YYYY-MM-DDThh:00:00');
    const {events} = this.state;
    const page = ( events && events[date] && events[date].page ) || 0;
    const list = ( events && events[date] && events[date].list ) || [];
    const total = ( events && events[date] && events[date].total ) || 0;
    const retrieved = ( events && events[date] && events[date].retrieved ) || 0;

    return (
      <div>
        {list.map( (event) => <Event key={event.id} item={event} /> )}
        {(retrieved < total) && <Button onClick={() => this.fetchEventsAfterDate(date,page+1)}>Show more</Button>}
      </div>
    );
  }
}


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

const Button = ({ onClick, children }) =>
  <button
    onClick={onClick}
    type="button"
  >
    {children}
  </button>

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default App;
