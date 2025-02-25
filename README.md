## What is this project for?
This system connects a Magento site and an external source to get their stock in sync. The main implementation is with Woocommerce and Magento. But other implementations in prototype mode have also been explored (csv feed, xml feed)

The project is based on 4 different components:
- React frontend (the project has 2 react frontend, one working with Create-React-App and the second using NextJS)
  The whole project can use either and perform the same functionalities. The reason to have the NextJS frontend as well is to experiment a migration exercise with a popular and non-deprecated environment
- NodeJS backend
  This backend exists to handle all API activities (pull data, caching, parsing) with external systems
- Keystone CMS backend
  This system is a popular Australian system enabling to share and persist data to support the system activities. https://keystonejs.com/docs/getting-started

## start the project
- keystone-backend folder, run `yarn dev`
- node-backend folder, run `npm start`
- next-frontend folder, run `npm run dev` (the react-folder is also usable)

nvm use 18
in react-frontend folder, run `npm start`

## post live activities
To remove the config for `initFirstItem` in Keystone environment when go-live happens as it would leave security holes with the system

