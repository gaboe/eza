import * as React from "react";
import { AppPreviewQueryVariables, ColumnInputType } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { LeftLayout } from "./../generated-app/LeftLayout";
import { PagePreview } from "./PagePreview";
import { AppPreviewComponent, APP_PREVIEW_QUERY } from "../../graphql/queries/generatedApp/tables/AppPreview";
import styled from "styled-components";

type Props = {
  columns: ColumnInputType[],
};

const Wrapper = styled.div`
max-height: calc(80vh);
`;

class AppPreview extends React.Component<Props> {
  render() {
    const variables: AppPreviewQueryVariables = {
      columns: [],
      pageName: "new page"
    };
    return (
      <>
        <Wrapper>
          <AppPreviewComponent query={APP_PREVIEW_QUERY} variables={variables} fetchPolicy="network-only">
            {
              response => {
                if (response.loading || !response.data) {
                  return <div>Loading</div>;
                }
                if (!response.data.appPreview || response.data.appPreview.pages.length === 0) {
                  return <Header
                    content="It looks like, you don't have any view yet. Create some via Database Explorer"
                  />;
                }

                const page = response.data.appPreview.pages[0];

                return (
                  <>
                    <Header>
                      {response.data.appPreview.description.name} will look like this
                    </Header>

                    <LeftLayout menuItems={response.data.appPreview.menuItems}>
                      {
                        page &&
                        <PagePreview columns={this.props.columns} />
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
          </AppPreviewComponent >
        </Wrapper>
      </>
    );
  }
}

export { AppPreview };