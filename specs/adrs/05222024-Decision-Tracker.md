---
parent: Decisions
nav_order: 100
title: ADR 2024-05-22 -Implement Project Tracker Feature

status: pending
date: 2024-05-22
deciders: Team Lead - Brandon Rogers, Yvanna Cardenas
consulted: Kashish Jain
informed: Client
---

# Implement Project Tracker Feature

## Context and Problem Statement
In our development of a platform tailored for developers with a keen interest in space and astronomy, we wanted to give the user the ability to track their current projects. This would include displaying the deadlines by which projects must be completed and the developer’s current progress towards completing those projects.


## What we will have in the Project Tracker

* Ability to add and delete projects
* Progress bars 
* Rocket indicators signifying current progress
* Menu buttons leading to other features or back to the home menu
* Unique planet-themed page background

## Importance of the feature
We view this feature to be of high importance as it allows users to have a clear view of which projects they are working on and how complete those projects are. The engaging design and rocket-themed project bars produce feelings of satisfaction in the user as they gradually observe a rocket reaching the end of the project bar.


### Pros and cons of this feature
* Good, relatively straightforward design based off of HTML slider
* Good, users can easily add and remove projects
* Good, users experience feelings of satisfaction upon completing a project
* Bad, must define how the user gains progress
* Bad, may require integration with monthly calendar or daily TODO items
* Bad, might be an “odd man out” in relation to other features, as it is less like a journal or diary


## Validation

The implementation will be reviewed by our team lead to ensure usability and effectiveness. Feedback will be incorporated iteratively to refine the feature.

## More Information

This decision will be revisited after the initial release based on user feedback and usage metrics. Continuous integration practices will ensure that updates can be rolled out swiftly to adapt to user needs.
