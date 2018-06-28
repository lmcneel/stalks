# Contributing to this Repo

This document is not final and is subject to change.

## General Contribution Requirements

- All pull requests should be related to an issue. If the task you are working on does not have an issue, please create one first.

- [ESLint](https://eslint.org/) is configured and extending [Google's styleguide](https://github.com/google/eslint-config-google). All pull requests must pass the linter to be accepted.
  -- You can and I recommend install a plugin for VSCode for ESLint. Its simply called ESLint. It will highlight issues with red squigglies as you code.
  -- Second, you can run a script with `npm run lint-watch` or `yarn lint-watch` that will watch the files and spit out errors. I will run the script to test pull-requests.

- A testing framework is not set up at this time, but will be in the future. Code will also have to pass tests to be submitted.

## Branching Guidelines


### Main Branch Definitions
- Master branch should never be pushed to directly and should be incapable of doing so.
- Dev branch is the main branch developers should work from.
- QA and Stage branches are for testing. QA locally, Stage on the testing site.
- Production branch goes to the production server only after QA/QC on the stage branch and site.

### Workflow Guidelines

After cloning the repo, the developer should checkout the `dev` branch of the repo. If a branch does not exist for the feature you are working on, create a branch for the feature. Check the active branches before this step, these branches probably already exist. If the feature branch exists, and *it probably does*, check out the feature branch. From there create a new branch with the name following these guidelines

`git checkout -b feature-name/issue-#` where feature-name is substituted for the feature you are working on and # is the issue number you are working on.

Once you are done working on that issue, create a pull request for your branch to the main feature. Once the feature is working, a pull request can be made from the feature to the dev branch.


## File structure

> The structure below is a rough file structure to provide guidelines when creating new files. As the application changes, there may be a need for additional structures.

- client (react code)
  -- src
    --- components
      ---- name_of_component_type (eg. scaffolding, forms, content)
      ---- descriptivename.js (eg. inputField.js, grid.js, etc)
    --- assets
      ---- scss
      ---- images
    --- index.js
    --- app.js
- controllers
  - descriptorController.js (descriptor should describe the controller, contains extra definitions, functionality that would clutter a route file)
- config (created with sequelize-cli)
- models
  -- mysql
  -- mongo
- routes  (create one route file per table name)
  -- tableName.js 
- server.js
- package.json
