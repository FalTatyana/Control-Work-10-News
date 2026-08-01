import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NewMessage from "./components/NewPost/NewPost";
import MessageList from "./components/PostList/PostList";
import PostItem from "./components/PostItem/PostItem";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path={"/"}
          element={
            <>
              <NewMessage /> 
              <MessageList />
            </>
          }
        />
        <Route path={"/:id"} element={<PostItem/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
