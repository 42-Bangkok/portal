# portal
https://portal.42bangkok.com is a web service diligently maintained by the cadets, who are students of 42 Bangkok. This platform serves as a vital hub for the 42 Bangkok community, offering a wide range of resources and tools designed to support and enhance the learning experience of its members. It showcases the commitment and dedication of these cadets to create a thriving educational environment, facilitating communication, collaboration, and access to essential information for all students and stakeholders within the 42 Bangkok ecosystem.

# Contribution Guide

Welcome to our open-source project! We appreciate your interest in contributing. Before you start, please take a moment to read through this guide to understand how you can contribute effectively.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Submitting Issues](#submitting-issues)
3. [Making Pull Requests](#making-pull-requests)
4. [Coding Guidelines](#coding-guidelines)
5. [Code of Conduct](#code-of-conduct)

## Getting Started

To get started with contributing, you'll need to follow these steps:

1. **Fork** the repository to your own GitHub account.
2. **Clone** the forked repository to your local machine.
3. Create a new branch for your work: `git checkout -b your-feature`.
4. Make your changes and commit them: `git commit -m "Add your message here"`.
5. Push your changes to your fork: `git push origin your-feature`.
6. Create a **Pull Request** (PR) from your branch to the main repository.

## Deploying project on local machine

1. Clone the repository to your local machine.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file in the root directory of the project and add the following environment variables:
```
FORTY_TWO_CLIENT_ID: from your intra.42.fr API (https://profile.intra.42.fr/oauth/applications)
FORTY_TWO_CLIENT_SECRET: from your intra.42.fr API (https://profile.intra.42.fr/oauth/applications)
NEXTAUTH_URL: http://localhost:3000 if you are running the project locally
NEXTAUTH_SECRET: any random string
```
4. Run the project: `npm run dev`.


## Submitting Issues

If you find any bugs, have questions, or want to suggest enhancements, please [open an issue](https://github.com/yourusername/yourrepository/issues) on our GitHub repository. Be sure to include detailed information about the issue you're reporting.

## Making Pull Requests

When making a pull request, please ensure the following:

- Your code follows our coding guidelines (see [Coding Guidelines](#coding-guidelines)).
- You've added necessary documentation for your changes.
- Your code is tested, and all tests pass.
- You've explained the purpose of your PR and the changes made.

## Coding Guidelines

We follow a set of coding guidelines to maintain code consistency. Please review these guidelines before contributing:

- Your PR must be reviewed
- npm run build must pass
- follow sensible coding style

## Code of Conduct

As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests, and other activities.

We are committed to making participation in this project a harassment-free experience for everyone, regardless of level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery
- Personal attacks
- Trolling or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information, such as physical or electronic addresses, without explicit permission
- Other unethical or unprofessional conduct

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, issues, and other contributions that are not aligned with this Code of Conduct. Project maintainers who do not follow or enforce the Code of Conduct may be temporarily or permanently removed from the project team.

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [contact email]. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident.

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org), version 1.4, available at [https://www.contributor-covenant.org/version/1/4/code-of-conduct.html](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).


Thank you for contributing to our project! We appreciate your help in making it better.

Happy coding!
