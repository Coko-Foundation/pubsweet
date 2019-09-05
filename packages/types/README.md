# PubSweet Types

Abstractions of types and interfaces for shared PubSweet components.

## Purpose

The aim is to share a common set of types and interfaces between different publisher's implementations.

The idea is to mandate all PubSweet components to be shared will need to define the types and interfaces within this module. (This does not rule out breaking down this module later if the need arises).

## Background

One of the principle aims of the PubSweet community is to maximize reuse.
Often times this is difficult to do on a **code-level** as different organizations have different requirements
meaning code can become opinionated reducing its suitability for sharing.

In the past the shared-data-model was envisaged as the common interface between publishers.
However, each publisher has extended this model and sharing data structure is not conducive to
any publisher wishing to adopt a DDD approach, or needing an alternative approach to storing data.

The solution proposed is to introduce reuse at the **component-level**.
Across certain publishers independently, there has been an adoption of an architecture that uses [microservices](https://martinfowler.com/microservices/) or an approach using [Layers, Onions, Ports, Adapters: it's all the same](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/).
Such an approach will create opportunities for reuse on the server-side beyond that of `pubsweet-server`
extending to any other microservice used, for example, @hindawi/queue-service.
Additionally, an alternative web-framework could be used other than `pubsweet-server` itself.
This allows publishers to build using their own needs for infrastructure while concentrating on sharing components
that handle the publishing domain in an abstract way.

This is seen as a way to increase reuse and diversity within the PubSweet community.

## Documentation

> You can generate documentation by running `yarn doc`, which will put HTML docs into the `doc/` folder
