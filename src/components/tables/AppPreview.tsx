import * as React from "react";
import { AppPreviewQueryVariables, ColumnInputType, AppPreviewQuery } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { LeftLayout } from "./../generated-app/LeftLayout";
import { PagePreview } from "./PagePreview";
import { AppPreviewComponent, APP_PREVIEW_QUERY } from "../../graphql/queries/generatedApp/tables/AppPreview";
import styled from "styled-components";

type Props = {
  columns: ColumnInputType[];
  url: string;
  pageCid?: string;
};

type State = {
  columnsForQuery: ColumnInputType[];
  pages?: NonNullable<AppPreviewQuery["appPreview"]>["pages"]
};

const Wrapper = styled.div`
max-height: calc(80vh);
`;

class AppPreview extends React.Component<Props, State> {

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    // if (!prevState || prevState.columnsForQuery.length === 0 && nextProps.columns.length > 0) {
    return { columnsForQuery: nextProps.columns };
    // }

    // return null;
  }

  render() {
    console.log(this.props.pageCid);
    const variables: AppPreviewQueryVariables = {
      columns: this.state.columnsForQuery,
      pageName: "new page"
    };
    return (
      <>
        <Wrapper>
          <Header>
            App preview
           </Header>

          <AppPreviewComponent query={APP_PREVIEW_QUERY} variables={variables} fetchPolicy="network-only">
            {
              response => {
                if (response.loading || !response.data) {
                  return (
                    <>
                      <LeftLayout loading={response.loading} urlPath={this.props.url} menuItems={[]}>
                        <Header as="h4" content="You do not have any pages generated yet" />
                      </LeftLayout>
                    </>
                  );
                }
                if (!response.data.appPreview || response.data.appPreview.pages.length === 0) {
                  return <Header
                    content="It looks like, you don't have any view yet. Create some via Database Explorer"
                  />;
                }

                const page = this.props.pageCid
                  ? response.data.appPreview.pages.find(x => x.cid === this.props.pageCid)
                  || response.data.appPreview.pages[0]
                  : response.data.appPreview.pages[0];

                return (
                  <>
                    <LeftLayout
                      loading={response.loading}
                      urlPath={this.props.url}
                      menuItems={response.data.appPreview.menuItems}
                    >
                      {
                        page && page.table &&
                        <PagePreview
                          header={page.name}
                          columns={page.table.columns.map(x => {
                            const c: ColumnInputType = {
                              dataType: x.dbDataType,
                              name: x.dbColumn,
                              schemaName: x.dbSchema,
                              tableName: x.dbTable
                            };
                            return c;
                          })}
                        />
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