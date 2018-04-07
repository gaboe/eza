import * as React from "react";
import { GetAppLayoutQuery, TableQueryQueryVariables } from "../../generated-types/types";
import { Header } from "semantic-ui-react";
import { TableQuery, TABLE_QUERY } from "../../graphql/queries/generatedApp/tables/TableQuery";
import { PageTable, Row, ColumnData } from "./PageTable";

type Props = {
  page: NonNullable<GetAppLayoutQuery["app"]>["pages"][0]
};

class Page extends React.Component<Props> {

  render() {
    const variables: TableQueryQueryVariables = {
      tableID: this.props.page.table.id
    };
    return (
      <>
        <Header as="h3" content={this.props.page.name} />

        <TableQuery query={TABLE_QUERY} variables={variables} >
          {
            response => {

              if (!response.loading && response.data && response.data.tableQuery && response.data.tableQuery.rows) {
                const rows = response.data.tableQuery.rows.map(x => {
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
                    columns={this.props.page.table.columns.map(x => x.columnName)}
                    loading={response.loading}
                    rows={rows}
                  />
                );
              }
              return (
                <PageTable
                  columns={this.props.page.table.columns.map(x => x.columnName)}
                  loading={response.loading}
                />
              );
            }
          }
        </TableQuery >
      </>
    );
  }
}

export { Page };