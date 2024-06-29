import Chat from "./components/Chat/Chat";
import ChatProvider from "./context/ChatProvider";
import "./App.css";

function App() {
  return (
    <>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </>
  );
}

export default App;
