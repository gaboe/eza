import * as React from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { DatabaseExplorer } from "./components/database-explorer/DatabaseExplorer";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_SERVER_URL,
    credentials: "include"
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    }
  }
});
class App extends React.Component {
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <DatabaseExplorer />
        </ApolloProvider>
      </>
    );
  }
}

export default App;
