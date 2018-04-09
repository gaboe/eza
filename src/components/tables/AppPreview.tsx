import * as React from "react";
import {
  AppPreviewQueryVariables,
  TableInputType, ReferenceInputType, AppPreviewQuery
} from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { LeftLayout } from "./../generated-app/LeftLayout";
import { PagePreview } from "./PagePreview";
import { AppPreviewComponent, APP_PREVIEW_QUERY } from "../../graphql/queries/generatedApp/tables/AppPreview";
import styled from "styled-components";

type Props = {
  url: string;
  pageCid?: string;
  table: TableInputType;
  pageName: string;
};

type Reference = NonNullable<NonNullable<
  AppPreviewQuery["appPreview"]>["pages"][0]["table"]["columns"][0]["reference"]>;

const Wrapper = styled.div`
max-height: calc(80vh);
`;

const getReference = (reference: Reference) => {
  const r: ReferenceInputType = {
    primaryKey: reference.primaryKey,
    type: reference.type,
  };
  return r;
};

class AppPreview extends React.Component<Props> {

  render() {
    const variables: AppPreviewQueryVariables = {
      table: this.props.table,
      pageName: this.props.pageName
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
                        <Header as="h4" />
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

                console.log(page);
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
                          table={
                            {
                              tableName: page.table.tableName,
                              schemaName: page.table.schemaName,
                              columns: page.table.columns.map(x => {
                                return {
                                  columnName: x.columnName,
                                  schemaName: x.schemaName,
                                  tableName: x.tableName,
                                  isFromPrimaryTable: x.isFromPrimaryTable,
                                  isKey: x.isKey,
                                  reference: x.reference ? getReference(x.reference) : null
                                };
                              })
                            }}
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