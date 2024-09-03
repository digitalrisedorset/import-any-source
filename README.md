## What is this project for?
The project is beased on 4 different components:
- React frontend (the project has 2 react frontend, one working with Create-React-App and the second using NextJS)
  The whole project can use either and perform the same functionalities. The reason to have the NextJS frontend as well is to experiment a migration exercise with a popular and non-deprecated environment
- NodeJS backend
  This backend exist to handle all the API activities (pull data, caching, parsing) with external systems
- Keystone CMS backend
  This system is a popular Australian system that enables the project to share and persist data for the overall system activities. https://keystonejs.com/docs/getting-started

## start the project
- keystone-backend folder, run `yarn dev`
- node-backend folder, run `npm start`
- next-frontend folder, run `npm run dev` (the react-folder is also usable)

nvm use 18
in react-frontend folder, run `npm start`

## post live activities
To remove the config for `initFirstItem` when go-live happens as it would leave security holes with the system

