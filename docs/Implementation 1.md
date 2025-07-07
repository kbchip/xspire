# 1. Introduction

Xspire is a food tracking application for people who want to get the most out of their ingredients. Users can keep tabs on when food was bought, where it is stored, and when it expires. Xspire also provides recipe suggestions for food that's about to go bad, as well as recipes that only include ingredients the user has on hand.

**Value Proposition:** Xspire helps users reduce food waste, save money, and positively impact the environment by tracking food inventory and sending timely alerts to avoid spoilage.

**Main Features:**
- Food inventory
- Expiration date tracking
- Expiration alerts
- Smart recipe suggestions based on soon-to-expire items
- Waste tracking and analytics
- Shopping list generation
- Multi-user household support

**GitHub Repository:** [kbchip/xspire](https://github.com/kbchip/xspire)

# 2. Implemented Requirements

## 2.1 Chip Haskins

[Pull Requests](https://github.com/kbchip/xspire/pulls?q=is%3Apr+author%3Akbchip)
![image](https://github.com/user-attachments/assets/ade57325-5849-447e-a0b4-7cd25901aed2)

## 2.2 Amber Quinn

**NOTE:** Amber was in the ER and was not able to participate at the Saturday technical meeting. She notified the group beforehand and the other members were successfully able to adapt.
[Pull Requests](https://github.com/kbchip/xspire/pulls?q=is%3Apr+author%3Aambermariequinn)
![image](https://github.com/user-attachments/assets/e5d2aa7b-7f22-4228-9ac4-04bcea36c6a2)

## 2.3 Ferm Valenzuela

[Pull Requests](https://github.com/kbchip/xspire/pulls?q=is%3Apr+author%3Aprojectsbyferm)
![image](https://github.com/user-attachments/assets/16245c74-a47e-4908-a002-cbbd4d0b25ec)

# 3. Testing Strategy

Still WIP at time of writing. [Jest](https://jestjs.io/) testing planned but not implemented.

# 4. Technology Stack

### Azure

Azure provides our hosting and database services. Specifically, we use Azure Web Apps (through Azure App Services) and Azure Database with MySQL. We chose Azure over alternatives like AWS and Heroku because all team members have prior experience with the Azure ecosystem, as well as the generous student credits we all get through NAU.

### Node.js

Node is our dependency manager and backend. On the development side, Node (and npm) provide utilities for running and testing code locally, as well as managing versioning and dependencies. This was a relative no-brainer, as the other tech stack options that were compatible with Azure were either unfamiliar to one or more team members (PHP, Go) or too complex for our needs (Java, .NET).

### Next.js (planned)

Next.js will be our full-stack framework for building the app. It provides page routing, client-server separation, and is one of the premier choices for using with our frontend, React. Alternative frameworks like Vue, Express, and Angular were considered, but Next.js appeared to be the most robust and the one most team members wanted to gain real-world experience using.

### React (planned)

React will be our front-end framework for serving clients the webpage and providing interactions with the web app. React offers reusable components, which makes designing the layout of each page much easier and lends itself well to cohesive visual language. Like Next.js, React was chosen for its reputation and was the framework our team members most wanted to gain experience with.

### Express (temporary)

Express is our temporary back-end framework used for page routing and HTTP requests. It was chosen for its ease of implementation and compatibility with our mockup, which was made with Balsamiq and later Bootstrap.

### Bootstrap (temporary)

Bootstrap is our temporary CSS framework for designing the layout of the app. It uses pre-defined components to speed up the process of getting a website up and running in a usable state. It was chosen based on its structural similarity to React Since Ferm took the lead on web design, he was given final say on the framework for the inital mockup. He had experience using Bootstrap, so it was the one he used.

### Visual Studio Code

Visual Studio Code (VSCode) is our text editor and IDE. It has a rich ecosystem of plugins and is very user-friendly, partially owing to its vast customization options. Also, our team already uses/used VSCode currently or in the past, so the learning curve was nonexistent.

# 5. Learning Strategy

Besides word-of-mouth via team group chat, Chip used Next.js's [fantastic learning resources](https://nextjs.org/learn) to familiarize himself with Next.js and React for the next stage of development.

# 6. Deployment

**Live System Link:** [Xspire](https://xspire-deesfqgmdaexhgdz.westus3-01.azurewebsites.net/)

**Deployment Method:** Azure integrated CD with GitHub Actions - automatic deployment on commits to main

**Platform Justification:** (From above) We chose Azure over alternatives like AWS and Heroku because all team members have prior experience with the Azure ecosystem, as well as the generous student credits we all get through NAU.
