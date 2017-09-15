## Application Structure

Based on the initial folder structure created by `react-create-app` and the [Airbnb-react style guides](https://github.com/airbnb/javascript/tree/master/react).

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── index.js
    └── routes.js
    └── components
        └── App
        └── ...
    └── containers
        └── ...
    └── state
    └── services
        └── auth
        └── maps
        └── geocoding
        └── JWT
        └── ...
    └── assets
        └── styles
        └── images
        └── fonts
    └── ...
```

The application entry point is `/src/index.js`. Here is loaded the first component: App. (Later we'll add here state, translations, (global stylings?) and other configurations.)

The App component is responsible for initializing the Router and loading the first routes from `/src/routes.js`. Nested routes are dynamically added, whenever necessary. See [React-router v4](https://reacttraining.com/react-router/web/guides/philosophy).


## Components structure
```
src
├── containers
│   └── Auth
│       └── LoginPage.js
│       └── SignupPage.js
│   └── UserPage
│       └── AccountPage.js  --> Stateful container
│       └── ProfilePage.js
│       └── ResultsPage.js
│       └── WorkoutsPage.js
│       └── index.js        --> Stateless container, wraps up the other stateful user pages
│       └── index.spec.js
│       └── index.css
│   └── Admin
│       └── ...
│   └── index.js  -- inital routes
│   └── MenuContainer
│       └── index.js (calls sidebar and navbar components)
│   └── HomePage
│       └── index.js (calls menu controller, page component, ...)
│   └── DetailPage.js
│       └── CoachDetailPage.js
│       └── EventDetailPage.js
│   └── ...
├── components
│   └── common
│       └── Button.js
│       └── H1.js
│       └── ...
│   └── layout
│       └── Page.js (renders menuContainer + children)
│       └── Sidebar.js
│       └── Navbar.js
│       └── Footer.js
│       └── List.js
│       └── ...
│   └── ...
```

Our react components are divided between components/containers.
Note that:
- Containers can be stateless
  - Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList
- Components can have state (UI state rather than data), event though they are merely presentational
  - Examples: Page, Sidebar, Story, UserInfo, List
Our motivation for having a components/containers separation:
- A separation by smart/dumb components makes it easier to apply rules such as "dumb components don't expose anything to the outside".
For better understanding how we're using this approach, see [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov and [this gist](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c) by Micheal Chan.

Within the components, we also apply the following separation:
- `/components/common` holds very generic and reused components such as Buttons, Headers (H1, H2, ...), form inputs (Input, Textarea, as well as more complex ones like *Date-picker* or *Power-select*),
- `/components/layout` holds layout sections such as header, footer, navbar, etc.

Everything inside the `/src` folder is reachable with a global import, eg. `import Button form component/common/Button`.

#### Test files
We keep test files close to their components. It makes it easier to keep track of which components have tests and which don't. A `tests` folder apart from the components, mimicking the same structure, is cumbersome and hard to maintain. More detailed explanation [here](https://www.sitepoint.com/organize-large-react-application/).
(The same might apply for state files, later.)


## State Management
We separate State Management (`/src/state`) from UI files (`/src/components`). See [here](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) why.

(What to use? Options: redux, mobx ? - ducks/re-ducks ?)


## External libraries
External libraries or services are kept in `/src/services`. Think of these as all non-react component javascript.


## Naming and Coding conventions
- We follow the [airbnb style guides](https://github.com/airbnb/javascript/tree/master/react), with the following exceptions:
  - .js extension: all javascript files, including those containing jsx, use the .js extension.
- Tests: All test files (UI or state), use `.spec.js`
- One react component per file


### Internationalization
(To be decided... )
Shall we keep a similar structure to what we have in ember ?
Possible plugins: [react-intl](https://github.com/yahoo/react-intl/wiki#getting-started), [react-i18next](https://github.com/i18next/react-i18next)
Intl:
- provides formatted dates (which replaces momentjs), numbers and text
- no common configuration file?
- react-intl-redux : for future integration
- babel-plugin-react-intl: string messages from React components that use React Intl
i18next:
- not react-only
- locize
