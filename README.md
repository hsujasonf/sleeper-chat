## Notes on Components:

### Chat:

This is the main component that renders the 500 chat messages, input form, and header.

- Local State: The prevMessageCount keeps track of the number of messages, and initialRender ensures the chat is scrolled to the most recent message on the initial render.
- useEffect: Contains logic for scrolling down when a new message appears, but does not scroll when a user likes or edits a message. It only scrolls when a new message is added.
- Component Structure: Contains a header, messages, and the MessageInputForm.
- Header Logic: When mapping the order, it determines whether a message should have a header. With more time, this would be refactored for cleaner code.
- Potential Refactors: With more time, would've refactored in ChatProvider.

### Message + useMessageHandlers:

This component displays the message text, timestamp, and includes logic for hovering over a message to show an image preview. It also shows a like icon with the number of likes after a user likes the message.

- useEffect in useMessageHandlers: Closes the edit input if the user clicks outside the message.
- handleClickUnlike: Removes the userId from the message’s likedBy array when the like count is clicked again.
- handleClickEdit and handleSubmitEdit: Opens the input for editing and submits the changes.
- Potential Refactors: With more time, the hover options would be moved to its own HoverOptionsComponent, the unlike icon would be a separate component, and the formatted time logic would be moved to the dataUtils file.

### MessageInputForm + MessageHeader:

These components are more straightforward.

- MessageHeader: Displays the header for a message when necessary.
- MessageInputForm: Adds the user’s message to the chat.

### EditInputComponent:

This is the form used to edit a message.

- useRef: Keeps the user focused on the input when typing an edited message.
- Potential Refactors: With more time, this would be refactored along with MessageInputForm to create a common input component with different sizes for various use cases.

## Explanation of my thought process with this project:

- State Management: Used the useContext hook for state management, storing messages in an object for constant lookup for editing and deleting, and maintaining an order array for message order.
- Libraries: Installed Material UI but mainly used custom components, except for Avatar. Used faker for generating UUIDs and dates. Initially considered expanding faker usage for new messages and users but opted for provided mock data.

## Things I Tried but Scrapped:

- Multiple Chats: Considered creating multiple chats with different user combinations and a nav bar for navigation.
- Sign-In Page: Planned a sign-in page for user name entry.
- Layout Component: Planned a layout component to control the chat page layout but used the Chat component instead.

## Things I Didn’t Get To:

- Responses: Modeled ChatMessage for responses but didn’t implement it. Planned to build a ResponsesComponent like Slack.
- Date Component: Planned a component to show the date of messages, changing as you scroll.
- Unit Tests: Did not write unit tests.
- CSS Refactor: Planned to refactor CSS for consistent styles and create a commonComponents folder.
- File Structure: Planned to clean up file structure and refactor dataUtils for cleanliness.
- Node Packages: Planned to remove unused packages.
- Component Comments: Planned to provide more detailed comments on components.
- Error Handling: Planned to move setError and error handling to ChatProvider.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
