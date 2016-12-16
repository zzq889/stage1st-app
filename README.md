React Native Demo App
===

## Getting started

To build your own app on top of the Starter Kit, fork or mirror this repository. For serious use we recommend [mirroring using these instructions](https://help.github.com/articles/duplicating-a-repository/), since you can't make a fork of a public repository private on GitHub. To contribute to Starter Kit development or just playing around, forking is the way to go.

First, give your application a name by running `./support/rename.sh YourAppName`.

Once you have the code downloaded, follow the **[Setup guide](docs/SETUP.md)** to get started.

## Development workflow

After you have set up the project using above instructions, you can use your favorite IDE or text editor to write code, and run the application from the command line. Turn on React Native hot module reloading in the app developer menu to update your application as you code.

To learn how to structure your application and use the Redux application architecture, read the **[Architecture guide](docs/ARCHITECTURE.md)** for more details.

##### Start the application in iOS simulator
```
$ react-native run-ios
```

##### Start the application in Android simulator
(If using the stock emulator, the emulator must be running)
```
$ react-native run-android
```

##### Run unit tests
```
$ npm test
```

##### Run tests every time code changes
```
$ npm run test:watch
```

##### Generate code coverage report
```
$ npm run coverage
```

Read the **[Testing guide](docs/TESTING.md)** for more information about writing tests.

## Deployment

Read the **[Deployment guide](docs/DEPLOYMENT.md)** to learn how to deploy the application to test devices, app stores, and how to use Code Push to push updates to your users immediately.
