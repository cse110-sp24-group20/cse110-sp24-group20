---
parent: Decisions
nav_order: 100
title: ADR 2024-06-02 -Implement Daily Reflection Feature

status: pending
date: 2024-06-02
deciders: Team Lead - Brandon Rogers, Yvanna Cardenas
consulted: Kashish Jain
informed: Client
---

# Implement Daily Reflection Feature

## Context and Problem Statement
In our development of a platform tailored for developers with a keen interest in space and astronomy, we wanted to give the user the ability to levae their thoughts and feelings about how a given day went. This would include keeping a list of daily reflections, the ability to edit, add, and delete each reflection created, and the ability to rate how the day went, resulting in a sentiment icon being displayed.


## What we will have in the Project Tracker

* Ability to add and delete reflections
* Ability to edit reflections
* A tag for each reflection indicating the date of its creation
* Menu buttons leading to other features or back to the home menu
* Unique planet-themed page background

## Importance of the feature
This is one of the first features that we discussed adding, so we view it to be of high importance. Tracking your work isn't just about what you did, but also about how you felt while doing it. Because of this, we feel that adding a reflection feature is paramount to accomplishing our goal of creating a successful devlog. It also gives use a chance to repurpose some of the assets created for our warmup exercise.


### Pros and cons of this feature
* Good, users can view the day when they made a reflection
* Good, users can easily add and remove reflections
* Good, users can scroll through a list of all their previous reflections easily
* Bad, each reflection needs to be a separate js element save in local storage, may be tricky
* Bad, might be ignored if the user only desires to use our website as a scheduling tool
* Bad, prompting the user for their feelings and entering a corresponding emoticon may be cumbersome.


## Validation

The implementation will be reviewed by our team lead to ensure usability and effectiveness. Feedback will be incorporated iteratively to refine the feature.

## More Information

This decision will be revisited after the initial release based on user feedback and usage metrics. Continuous integration practices will ensure that updates can be rolled out swiftly to adapt to user needs.
