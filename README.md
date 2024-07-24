## start the project
in keystone-backend folder, run yarn keystone dev

## start the project
in node-backend folder, run `npm start`

nvm use 18
in react-frontend folder, run `npm start`


To remove the config for `initFirstItem` when go-live happens as it would leave security holes with the system


CREATE database keystone_import;
CREATE USER 'keystone_user'@'localhost' IDENTIFIED BY 'passw0rd';
GRANT ALL PRIVILEGES ON keystone_import.* TO 'keystone_user'@'localhost'  WITH GRANT OPTION;
FLUSH PRIVILEGES;
