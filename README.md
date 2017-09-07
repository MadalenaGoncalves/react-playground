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
    └── App.js ????????????
    └── App.test.js
    └── index.js
    └── views
        └── user
        └── coach
        └── sysadmin
        └── common
            └── translations
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
            └── logo.svg
        └── fonts
    └── ...
```
### Motivation
- Views & State separation: Always separate State Management from UI files  (https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)
- Tests: Having a dedicated `.test.js` file alongside to its component keeps it easier to keep track which components have tests and which don't. Having a `tests` folder apart from the views, might become cumbersome and hard to maintain. (https://www.sitepoint.com/organize-large-react-application/) (The same might apply for `state`)
- Common views: very generic and reused components such as `buttons`, headers (`h1`, `h2`, ...), form inputs (input, textarea, but also more complex ones like `power-select`, `date-pickers`, ...). Also `header`, `footer` or `sidebar` (as currently used in the menu) can be implemented here.
- Translations: Shall we keep a similar structure to what we have in ember ?
- Services: External libraries or services. All non-react-component javascript.


### Views structure
Option 1 (COACH and SYSADMIN shall follow):
```
user
├── pages
│   └── home.js
│   └── home.test.js
│   └── about.js
│   └── about.test.js
│   └── coach.js
│   └── event.js
│   └── fitness-facts.js
│   └── plans-pricing.js
│   └── profile-account.js
│   └── profile-events.js
│   └── profile-general.js
│   └── profile-results.js
│   └── ...
├── components
│   └── home-events.js
│   └── home-coaches.js
│   └── home-places.js
│   └── profile.js   (a wrapper component for the actual relevant pages: profile-account, profile-events, ... - is this intuitive? practical? scalable?)
│   └── ...
├── translations
│   └── en
│       └── page
│       └── component
│       └── ... (similar to ember-structure ? )
│   └── ...
├── App.js
└── App.test.js
```

Option 2:
```
user
├── app.js
├── app.test.js
│   └── home
│       └── home.js
│       └── home.test.js
│       └── events
│           └── events.js
│       └── coaches
│       └── places
│   └── about
│   └── fitness-facts.js
│   └── profile
│       └── profile.js
│       └── profile.test.js
│       └── account
│           └── account.js
│           └── account.test.js
│       └── events
│           └── events.js
│           └── events.test.js
│       └── ...
│   └── coach
│       └── coach.js
│       └── coach.test.js
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

### Naming/Coding conventions
- Pages/Components naming: (applies only to opt1)
- Tests naming: Either it's for UI or state, always use `.test.js`
- .jsx vs .js ?
- one react component per file
