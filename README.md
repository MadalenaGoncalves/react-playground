## Application Structure

Based on the initial folder structure created with `react-create-app`.

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
    └── views (components)
    └── state (redux, mobx ? - ducks/re-ducks ?)
    └── services ?
        └── auth
        └── maps
        └── geocoding
        └── JWT
        └── ...
    └── assets ?
        └── styles
            └── App.css
            └── index.css
        └── images
        └── fonts
    └── ...
```

### Motivation
- Views & State separation: Always separate State Management from UI files  (https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)
- Tests: Having a dedicated `.spec.js` file alongside to its component keeps it easier to keep track which components have tests and which don't. Having a `tests` folder apart from the views, might become cumbersome and hard to maintain. (https://www.sitepoint.com/organize-large-react-application/) (The same might apply for `state`)
- Common views: very generic and reused components such as `buttons`, headers (`h1`, `h2`, ...), form inputs (input, textarea, but also more complex ones like `power-select`, `date-pickers`, ...). Also `header`, `footer` or `sidebar` (as currently used in the menu) can be implemented here.
- Translations: Shall we keep a similar structure to what we have in ember ?
- Services: External libraries or services. All non-react-component javascript.


### Components structure
Option 1 : ~~pages + components~~ Views + Controllers
```
components
├── controllers
│   └── index.js  -- inital routes, auth logic, no-login page ?
│   └── index.spec.js
│   └── login.js
│   └── signup.js
│   └── logged-in.js
│   └── no-login.js
│   └── not-found.js
│   └── ...
│   └── coach.js
│   └── event.js
│   └── profile.js
│   └── profile-account.js
│   └── profile-events.js
│   └── profile-general.js
│   └── profile-results.js
│   └── ...
├── views
│   └── about.js
│   └── fitness-facts.js
│   └── plans-pricing.js
│   └── home-events.js
│   └── home-coaches.js
│   └── home-places.js
│   └── profile.js   (a wrapper component for relevant pages: account, my-events, ... - is it intuitive? practical? scalable?)
│   └── ...
├── translations
    ├── en
    │   └── page
    │   └── component
    │   └── ... (similar to ember-structure ? )
    └── ...
```

Option 2: Views Feature-First
```
views
├── index.js  -- inital routes, auth,
├── index.spec.js
│   └── auth
│       └── login.js
│       └── signup.js
│       └── logged-in.js
│   └── home
│       └── home.js
│       └── not-found.js
│       └── events
│           └── events.js
│       └── coaches
│           └── ...
│       └── places
│           └── ...
│   └── about
│   └── fitness-facts.js
│   └── profile
│       └── profile.js
│       └── account
│           └── account.js
│       └── events
│           └── events.js
│       └── ...
│   └── coach
│       └── coach.js
│   └── ...
├── translations
│   └── en
│       └── app
│       └── about
│       └── fitness-facts
│       └── ...
│       └── index.js
│   └── ...
```

Option 3: Views + Controllers (or Presentational + Containers), Feature-First
```
components
├── controllers/containers
│   └── auth
│       └── LoginPage.js
│       └── SignupPage.js
│   └── user
│       └── AccountPage.js
│       └── EventsPage.js
│       └── ...
│   └── admin
│       └── ...
│   └── index.js  -- inital routes
│   └── MenuContainer.js (calls sidebar and navbar components)
│   └── HomePage.js (calls menu controller, page component, ...)
│   └── CoachDetailPage.js
│   └── EventDetailPage.js
│   └── ...
├── views/presentational
│   └── admin
│       └── ...
│   └── auth
│       └── Login.js
│       └── Signup.js
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
│   └── About.js
│   └── FitnessFacts.js
│   └── User.js
│   └── ...
```

Notes:
- Controllers examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList
  - can be stateless
- Views examples: Page, Sidebar, Story, UserInfo, List
  - are only presentational, but can have state (UI state rather than data)
- See: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 and https://gist.github.com/chantastic/fc9e3853464dffdb1e3c

### Naming conventions
- Pages/Components: ...
- Tests: Either it's for UI or state, always use `.spec.js`
- .jsx vs .js ?

### Coding conventions
- one react component per file

### Structure
- Smart components + Route wrappers + dumb components ?
- Not all pages will be smart: static pages such as about are merely presentational.
- A separation by smart/dumb components makes it easier to apply rules such as "dumb components don't expose anything to the outside"


### Internationalization
Possible plugins: [react-intl](https://github.com/yahoo/react-intl/wiki#getting-started), [react-i18next](https://github.com/i18next/react-i18next)
