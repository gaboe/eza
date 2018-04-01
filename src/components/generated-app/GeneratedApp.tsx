import * as React from "react";
import { GET_APP_LAYOUT_QUERY, AppLayoutQueryComponent } from "../../graphql/queries/generatedApp/GetAppLayoutQuery";
import { GetAppLayoutQueryVariables } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { LeftLayout } from "./LeftLayout";
import { Page } from "./Page";
class GeneratedApp extends React.Component {
  render() {
    const variables: GetAppLayoutQueryVariables = {
      cid: process.env.REACT_APP_CID || ""
    };
    return (
      <>
        <AppLayoutQueryComponent query={GET_APP_LAYOUT_QUERY} variables={variables} fetchPolicy="network-only">
          {
            response => {
              console.log(response);
              if (response.loading || !response.data || !response.data.app) {
                return null;
              }
              return (
                <>
                  <Header>
                    {response.data.app.description.name} will look like this
                    </Header>
                  <LeftLayout menuItems={response.data.app.menuItems}>
                    <Page page={response.data.app.pages[0]} />
                  </LeftLayout>
                </>
              );
            }
          }
        </AppLayoutQueryComponent >
      </>
    );
  }
}

export { GeneratedApp };