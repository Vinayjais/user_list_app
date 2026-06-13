# AI-Assisted Development: Approach & Usage

This document outlines the tools, prompts, and practices regarding the use of Artificial Intelligence (AI) during the development of this project.

## 1. AI Tools Used

* **Amazon Q**: Utilized for real-time code generation, React Native development guidance, and contextual debugging directly within the IDE environment.
* **ChatGPT (OpenAI)**: Employed for architectural discussions, refining complex logic (such as Redux state management), and exploring React Native best practices.

## 2. Major Prompts Used

Throughout development, several key prompts were used to guide the AI assistance:
* *"Create a React Native component for displaying a user row with label and value styling, using TypeScript."*
* *"How can I set up Redux Toolkit with `redux-persist` and `@react-native-async-storage/async-storage` for a React Native app?"*
* *"What is the best practice for handling pagination with a flat list in React Native while using Redux for state?"*
* *"In this file I have an undo option for deleted todos. I want to limit the undo option to exactly 10 seconds. If I delete multiple todos consecutively, manage it accordingly so that every individual todo has its own 10-second undo window, without changing other functionality."*

## 3. Files/Components Primarily Generated Using AI

The following parts of the codebase were largely scaffolded or generated using AI assistance:
* **UI Components**: Boilerplate code for basic display components such as `comonents/Row.tsx`.
* **Redux Slices**: Initial boilerplate for Redux Toolkit slices (actions and reducers).

## 4. Files/Components Significantly Modified Manually

While AI provided the foundation, the following areas required significant manual intervention, refactoring, and logic implementation by the developer:
* **State Management Integration**: Connecting the UI components to the Redux store and ensuring `redux-persist` correctly hydrated the state on app launch.
* **Complex UI/UX Flow**: Adjusting navigation configurations and ensuring smooth transitions between screens using `@react-navigation/native-stack`.
* **Type Definitions**: Refining and tightening TypeScript interfaces to ensure strict type safety across the entire application.

## 5. Challenges & Resolutions

During development, there were instances where AI-generated solutions were incorrect or suboptimal:

* **Challenge - Async Storage Issues**: AI-generated code for `redux-persist` missed the specific React Native import for AsyncStorage, leading to a persistence failure.
  * **Resolution**: Debugged the issue manually and explicitly imported `@react-native-async-storage/async-storage` into the persistence configuration.
* **Challenge - Pagination Logic**: AI suggested a basic flat list implementation that caused an issue where multiple API calls were triggered simultaneously on the first render, leading to redundant data fetching.
  * **Resolution**: Manually implemented `onEndReached` logic with state flags to prevent concurrent requests during the initial render and `initialNumToRender` for better performance.