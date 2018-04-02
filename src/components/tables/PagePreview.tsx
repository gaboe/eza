import * as React from "react";
import { ColumnInputType, TableQueryPreviewQueryVariables } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import {
  TableQueryPreviewComponent, TABLE_QUERY_PREVIEW
} from "../../graphql/queries/generatedApp/tables/TableQueryPreview";
import { Row, ColumnData } from "../generated-app/PageTable";
import { PageTable } from "./../generated-app/PageTable";

type Props = {
  columns: ColumnInputType[],
  header: string,
};

class PagePreview extends React.Component<Props> {

  render() {
    const variables: TableQueryPreviewQueryVariables = {
      columns: this.props.columns
    };
    return (
      <>
        <Header as="h3" content={this.props.header} />

        <TableQueryPreviewComponent query={TABLE_QUERY_PREVIEW} variables={variables} >
          {
            response => {
              if (!response.loading &&
                response.data &&
                response.data.tableQueryPreview &&
                response.data.tableQueryPreview.rows) {
                const rows = response.data.tableQueryPreview.rows.map(x => {
                  const row: Row = {
                    key: x.key,
                    columns: x.columns.map(c => {
                      const col: ColumnData = {
                        value: c.value,
                        columnName: c.columnName
                      };
                      return col;
                    })
                  };
                  return row;
                });
                return (
                  <PageTable
                    columns={this.props.columns.map(x => x.name)}
                    loading={response.loading}
                    rows={rows}
                  />
                );
              }
              return (
                <PageTable
                  columns={this.props.columns.map(x => x.name)}
                  loading={response.loading}
                />
              );
            }
          }
        </TableQueryPreviewComponent >
      </>
    );
  }
}

export { PagePreview };