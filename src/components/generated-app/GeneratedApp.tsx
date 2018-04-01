import * as React from "react";
import { GET_APP_LAYOUT_QUERY, AppLayoutQueryComponent } from "../../graphql/queries/generatedApp/GetAppLayoutQuery";
import { GetAppLayoutQueryVariables } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { LeftLayout } from "./LeftLayout";
import { Page } from "./Page";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ cid: string }>;

class GeneratedApp extends React.Component<Props> {
  render() {
    const variables: GetAppLayoutQueryVariables = {
      cid: process.env.REACT_APP_CID || ""
    };
    let pageCid = this.props.match.params.cid;
    console.log(pageCid);
    return (
      <>
        <AppLayoutQueryComponent query={GET_APP_LAYOUT_QUERY} variables={variables} fetchPolicy="network-only">
          {
            response => {
              if (response.loading || !response.data) {
                return null;
              }
              if (!response.data.app || response.data.app.pages.length === 0) {
                return <Header
                  content="It looks like, you don't have any view yet. Create some via Database Explorer"
                />;
              }
              pageCid = pageCid || response.data.app.pages[0].cid;
              const page = response.data.app.pages.find(x => x.cid === pageCid);

              return (
                <>
                  <Header>
                    {response.data.app.description.name} will look like this
                    </Header>

                  <LeftLayout menuItems={response.data.app.menuItems}>
                    {
                      page &&
                      <Page page={page} />
                    }
                    {
                      !page &&
                      <Header as="h4" content="You do not have any pages generated yet" />
                    }
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