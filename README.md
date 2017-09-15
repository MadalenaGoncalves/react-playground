## Application Structure

Based on the initial folder structure created with `react-create-app`.

The application entry point is `/src/index.js`.
This is responsible for initializing the routing service, state, translations, styling, ...
Apart from this, it also renders one single component (`App`) from where all the application routes and components will emerge.
Everything inside the `/src` folder is accessible with a global import, eg. `import Button form component/common/Button`.
This project follows [Airbnb react style guides](https://github.com/airbnb/javascript/tree/master/react), except for the naming of files containing jsx. All javascript files (including jsx) in this project use the .js extension.

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
    └── components
    └── containers
    └── state (redux, mobx ? - ducks/re-ducks ?)
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

### Motivation
- Views & State separation: Always separate State Management from UI files. See [here](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)
- Tests: Having a dedicated `.spec.js` file alongside to its component keeps it easier to keep track which components have tests and which don't. Having a `tests` folder apart from the views, might become cumbersome and hard to maintain. See [here](https://www.sitepoint.com/organize-large-react-application/). (The same might apply for `state`)
- Common views: very generic and reused components such as `buttons`, headers (`h1`, `h2`, ...), form inputs (input, textarea, but also more complex ones like `power-select`, `date-pickers`, ...). Also `header`, `footer` or `sidebar` (as currently used in the menu) can be implemented here.
- Translations: Shall we keep a similar structure to what we have in ember ?
- Services: External libraries or services. All non-react-component javascript.


## Components structure
- Follows a Feature-First approach, with a separation between components/containers (or not?)
- A separation by smart/dumb components makes it easier to apply rules such as "dumb components don't expose anything to the outside"
- Containers examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList
  - can be stateless
- Components examples: Page, Sidebar, Story, UserInfo, List
  - are only presentational, but can have state (UI state rather than data)
- See: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 and https://gist.github.com/chantastic/fc9e3853464dffdb1e3c

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

### Naming/Coding conventions
- Tests: Either it's for UI or state, always use `.spec.js`
- One react component per file
- See [airbnb style guides](https://github.com/airbnb/javascript/tree/master/react)


### Internationalization
Possible plugins: [react-intl](https://github.com/yahoo/react-intl/wiki#getting-started), [react-i18next](https://github.com/i18next/react-i18next)
Intl:
- provides formatted dates (which replaces momentjs), numbers and text
- no common configuration file?
- react-intl-redux : for future integration
- babel-plugin-react-intl: string messages from React components that use React Intl
i18next:
- not react-only
- locize
