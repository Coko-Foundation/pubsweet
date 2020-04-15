If you are a developer who has jumped straight to the technical portion of this book, go back to the beginning now! PubSweet technical decisions are at their core motivated by the issues with workflow described in the previous sections. Understanding those issues will allow you to better understand why our software is structured the way it is. Equally, if you are a non-technical person, do at least skim the following sections! They will give you a better insight into the nature of our technology and our community of developers.

In this chapter we provide a brief overview of the main parts of a PubSweet application. For more detail you will need to consult the chapters that follow.

PubSweet is composed on a technical level out of the following:

- `pubsweet-server`: an extensible Node.js server.
- `pubsweet-client`: a set of core React components.
- A data model: shared between client and server.
- PubSweet components: extend the server and/or client's functionality.
- `authsome`: encapsulates authorization logic.
- `pubsweet-cli` : runs scripts to start an application and to manage the database.

Below is a diagram representing the high level architecture of a PubSweet application.

<img src="image-15-0.svg" style="max-width: 700px; width: 100%;display: block;margin: 1em auto;">

High level architecture of a PubSweet application

# Server

The [`pubsweet-server`](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/server 'undefined') package is the backbone of PubSweet applications. It is built on top of the [Express](https://expressjs.com 'undefined') web framework. It comes as a dependency to your project, removing the need to develop your server from scratch, while also allowing for extensibility, in order to cover different organizations' custom needs. It is responsible for:

- Connecting to the database layer
- Maintaining a job queue
- Weaving together data model components, their migrations and schemas
- GraphQL API (via [Apollo Server](https://www.apollographql.com/docs/apollo-server/ 'undefined'))

The server can also extend its capabilities through server components. Common use cases for this would be providing a new data model or GraphQL query and integrating to an external service, but not limited to these. Server components also have access to the application's context through the server. `pubsweet-server` needs a connection to [PostgreSQL](https://www.postgresql.org/ 'undefined') database in order to provide the full-featured functionality that a server is expected to have.

# Client

The `pubsweet-client` [package](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/client 'undefined') provides the core setup that your front end needs. This includes connecting to the server for data fetching and writing, as well as a set of low-level React components. The most important of these components is `Root` which sets up the React app that runs in the user's browser. It ensures that other PubSweet components have access to a consistent set of services including routing, theming, network access and state management.

`pubsweet-client` currently handles network access and state management through Apollo Client, which is used for accessing the GraphQL API.

## Apollo

> [Apollo Client](https://www.apollographql.com/docs/react/ 'undefined') is designed to help you quickly build a UI that fetches data with GraphQL, and can be used with any JavaScript front-end.

Apollo Client is provided along with pubsweet-client in order to connect with `pubsweet-server`'s GraphQL endpoint. It also uses a smart caching mechanism that updates its internal state when a mutation is run, along with useful helpers for handling queries, mutations and subscriptions.

# Components

A PubSweet component is a collection of modules that can extend or change the functionality of the server and/or client of a PubSweet app. By combining components, you can build any publishing platform or workflow. See the Components part of this book for much more on this topic.

# Authentication and authorization

It is perhaps important to differentiate authentication from authorization, as these two concepts often get confused. Authentication is about establishing the identity of users, while authorization is controlling user access to resources.

Authentication can be provided in various ways:

- Username and password
- Authentication token
- External OAuth service, e.g. ORCID

Access control in PubSweet is applied through Authsome (see the “[Authorization and Permissions](#/Authorization%20and%20permissions 'undefined')” chapter).

Authsome is a flexible team-based authorization module, which means that authorization is determined based on team membership. A team consists of a group of members and belongs to one of the team types configured at load time. A team can also be conditionally active, i.e. only active if the current state of the object matches the requirement for team activation. Setting up and usage is covered in the Authsome chapter.

# Why did we choose our technical stack?

The guiding principle has been to choose tools that are open source, mature and popular. In the open source world, the popularity of a project is important as it leads to a virtuous development cycle. More users mean more contributions, improved code quality, better tooling and increased scrutiny to security concerns all of which result in more users.

## JavaScript

JavaScript is, along with HTML and CSS, one of the core languages of the web. After a period of stagnation in the 2000s, JavaScript is now enjoying a renaissance with important new features being standardised each year. The introduction of Node.js on the server and the rise of single page web applications means JavaScript is more important than ever, with some language popularity rankings putting it in the number one spot. This popularity comes with a host of benefits:

- many ready-made software packages to choose from
- easier-to-find software engineers
- more learning resources

This makes it a natural choice for PubSweet as publishers often have undernourished technology resources. Consequently, PubSweet is trying to lower the bar as far as possible to help you build or extend a publishing platform. Indeed, we hope that this book enables you to work with local development houses to build or extend the publishing platform of your dreams.

## Node.js

[Node.js](https://nodejs.org/en/docs/ 'undefined') is by far the most common way of running JavaScript in a server environment. It has a large and very active community. The [npm package manager](https://docs.npmjs.com/ 'undefined') is the biggest software repository on the planet, with more than double the number of packages as the next biggest.

## PostgreSQL

[PostgreSQL](https://www.postgresql.org/docs/ 'undefined'), while not always being the most popular open source database, is arguably the most mature, stable and feature-rich. Some of these features allow it to be used both as a relational database and a document store. This makes it particularly suitable for a component-based system where parts of the schema may need to be loosely defined but still queryable.

## GraphQL

[GraphQL](https://graphql.org/learn/ 'undefined') is an outlier in the list of PubSweet technologies as it is far less popular than the competing API standard, REST. However, the advantages it offers have been deemed compelling enough to warrant backing the less mature choice.

Some of these advantages are:

- Declarative data binding – front end components can specify the data they need and hand off the responsibility for fetching that data to the system.
- Self documenting – the API can be introspected to find the available queries and responses.
- Extensibility built in – allows data types to be extended by components.
- Clearer specification – REST is a very light specification which leads implementations to differ substantially in the details.

Some of the disadvantages are:

- Whereas denial of service (DOS) attacks against REST APIs can be mitigated by rate limiting at the network level, GraphQL APIs require a different approach. This is because queries can be arbitrarily complex and a single malicous request could result in hundreds of database queries.
- Caching also requires a very different approach since there is no mapping from URLs to queries as in REST.

The GraphQL ecosystem is still young, but is growing at a fast pace, and GraphQL is already used in many big software products, including Facebook (where it originated).

## Styled Components

[Styled Components](https://www.styled-components.com/docs 'undefined') is a CSS-in-JS solution for styling React components. This is a very crowded space with many competing solutions and new ones being created all the time. With a large community, good documentation and first-class theming support, Styled Components arose as a contender early on. The final decision to adopt it as a PubSweet technology was made by the community after comparisons with other solutions.

# How were these technologies chosen?

Most decisions in PubSweet are made through a request for comments (RFC) process where:

- anyone can suggest a change
- it gets discussed by interested parties
- a choice is made based on the presented arguments

An example of an RFC process is the [styled-components discussion](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/315 'undefined').

It's worth noting that major changes do happen. Two recent major changes include replacing PouchDb with PostgreSQL, and removing the REST API in favor of GraphQL. These decisions were made by the community through the RFC process, and we welcome your future participation.
