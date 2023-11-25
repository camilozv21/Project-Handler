import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./views/Home";
import { NavigationBar } from "./components/NavigationBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Dashboard } from "./views/Dashboard";
import NotFound from "./views/NotFound";
import { validateToken } from "./utils/token"

const httpLink = createHttpLink({
  uri: "https://project-handler-jvl7.vercel.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const isTokenValid = () => {
  let token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return false;
  }

  let exp = localStorage.getItem("exp");

  if (!exp || exp < Math.floor(Date.now() / 1000)) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return false;
  }

  return true;
};

function App() {
  const isAuthenticated = validateToken();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Home />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
