import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NewMessage from "./components/NewMessage/NewMessage";
import MessageList from "./components/MessageList/MessageList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path={"/messages"}
          element={
            <>
              <NewMessage /> 
              <MessageList />
            </>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
