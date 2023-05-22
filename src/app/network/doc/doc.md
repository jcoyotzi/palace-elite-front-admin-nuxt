# Add new api to the project

In order to add new classes to consume an API REST FULL
we can do that easy.

## How?

### 1- Run the command

NPM:

```
npm run add:api
```

Yarn:

```
yarn add:api
```

### 2- Input the name of the API.

- Example 1 (Single word name):

```
Api name:strapi
```

- Example 2 (Multiple words name):

```
Api name: strapi legacy
```

### 3- Input the API base url

- Example:

```
Url: https://swapi.dev/api
```

### 4- Wait for the creation and registration of files

When the files are done you can see this text on the console:

```
File is created successfully: src\app\network\restApis\strapiLegacyApi.ts
Containers are updated!
Types are updated!
```

This means that the abstract interface and the class that consume the api endpoints
was registered on httpTypes.ts and apisContainer.ts.

### 5- Find the file

Your new file will be in ".\src\app\network\restApis\"
if you can separate the url, you need to add the url to .env file and register it in nuxt.config.js

## Design

![Diagram](EndPointArch.PNG)

**HttpApi** is an interface that contains CRUD methods
GET, POST, PUT, DELETE.

In order to bind dependency injection, all **ApiAbstract** interfaces
extends from HttpApi interface.

The concrete **Api Class** implements the ApiAbstract interface.

Thinking in the fast development and clear and decoupled code, the implementation of
Axios Http Client is encapsulated in a service: **AxiosServer**
this service implements HttpApi interface.

Then to add all the functionality to the new Api Class
the decorator **AxiosApi** inject the axios features.

In the future if the team need change this behaviour,
only needs to write new decorator and replace the older.
