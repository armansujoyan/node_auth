## Authentication seed for Node.

Basic authentication starter created with Node, Express, Passport and bcrypt using JWT tokens. Database used in this project is MongoDB with Mongoose.  The project includes following routes.

```
/users/signup - New user registration
/users/signin - User sign in
/users/oauth/google - Authentication route for Google
/users/secret - Protected route for authentication check.
```

## The project structure

```
├── app.js // Main application file
├── config
│   └── index.js  // Global configuration
├── controllers
│   └── usersController.js  // User route controllers
├── helpers
│   └── routeHelpers.js  // Additional body validation helper for routes
├── models
│   └── userModel.js  // Mongoose model for user
├── package.json
├── package-lock.json
├── passport.js  // Passport configuration
├── README.md
├── routes
│   └── usersRoute.js  // Route declaration
└── yarn.lock
```

## Running the project

1. Clone the repository by ```git clone https://github.com/armansujoyan/node_auth.git```
2. Install all the dependencies via ```yarn``` or ```npm install```
3. Run the development server via ```yarn start``` or ```npm start```
4. The server will start running on port 4000. You can change this from package.json configs.

You also need to have MongoDB installed and running in order to have the application work. For more details on how to install and run Mongo go to official [documentation](https://docs.mongodb.com/manual/installation/).

## Running the tests

All the tests of the project are located in ```__tests___```  folder. The project is dependent upon ```cross-env``` package in order to support environment support across all platforms. The report files of ```nyc``` will be generated inside ```__tests__/report``` repositroy. The commands available to test the application are the following.
1. ```yarn test``` - Run all tests available in ```__tests__``` directory.
2. ```yarn report``` - Generate the report in ```__tests__/report``` folder.
3. ```yarn text-report``` - Generate the report in the text format
4. ```yarn nyc``` - Run tests and generate reoprt

## Configuring OAuth

In order to configure OAuth authentication routes, you need to provide secret and id token of corresponding 3-rd party apps in the config file, which is located in ```config/index.js```.
