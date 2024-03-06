# Tech test for salve

Did a bit of freestyling with this, tried out [rtk query](https://redux-toolkit.js.org/rtk-query/overview) for the first time.

There's 2 directories. `client` and `server`. Both have a `npm run start` script to get it running. Clicking on the table headers does the sorting.

## server

- I usually write backends the traditional SOLID way; services and controllers. Services have functions which do one thing in one context, controllers stitch together multiple services to perform a logical task. Makes it easy to test and stub.

- I did the sorting on the backend as that's where it would happen in a real app, alongside serching and pagination. Loaded all the data into memory which isnt amazing but like the spec said, its not alot. Sorting is just done using lodash [orderBy](https://lodash.com/docs/4.17.15#orderBy) and the api supports multiple sort fields e.g. http://localhost:8000/clinics/1/patients?sort=date_of_birth&sort=last_name&order=desc

## client

- Scaffolded with [create-react-app](https://create-react-app.dev/), I used [MUI](https://mui.com/) to get access to some easy UI components and used [redux+redux-toolkit](https://redux-toolkit.js.org/) with [rtk query](https://redux-toolkit.js.org/rtk-query/overview) and [redux-persist](https://github.com/rt2zz/redux-persist) to handle data loading, data caching, and shared state.

- On front ends I usually still follow the service controller pattern for the business layer so you will see a services layer.

- I tend to keep components near to where they are used until they need to be reused, so you will find most of the UI in the `/DashbordPage` module.

- I payed close attention to the render cycle and either used react hooks such as `useCallback` or redux [selectors](https://redux-toolkit.js.org/rtk-query/usage/migrating-to-rtk-query#selectors) to make sure to access memoised state and that references arent recreated on each render.

- Added debouncing with `useCallbackDebounced`. Usually you want this for places where events come in sharp bursts like search or mouse movements, here I added it to the sort click handler. Since clicking on the header makes an API request and users often spam click, this prevents unnecessary api calls to the server.

- There is basic loading and error state but you likely wont see it because the loading flags are typically delayed to allow for super fast requests. I implemented something similar in the [react suspense](https://react.dev/reference/react/Suspense) placeholder `SuspensePanel`
