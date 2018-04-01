import * as React from "react";
import { GetAppLayoutQuery, TableQueryQueryVariables } from "../../generated-types/types";
import { Header, Table } from "semantic-ui-react";
import { TableQuery, TABLE_QUERY } from "../../graphql/queries/generatedApp/tables/TableQuery";

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
        <Table celled={true} selectable={true}>
          <Table.Header>
            <Table.Row>
              {
                this.props.page.table.columns.map(x =>
                  <Table.HeaderCell key={x.dbColumn}>{x.dbColumn}</Table.HeaderCell>)
              }
            </Table.Row>
          </Table.Header>
          <TableQuery query={TABLE_QUERY} variables={variables} >
            {
              response => {
                if (response.loading || !response.data) {
                  return null;
                }
                if (!response.data.tableQuery || !response.data.tableQuery.rows) {
                  return <div>Nothing found</div>;
                }
                return (
                  <>
                    <Table.Body>
                      {response.data.tableQuery.rows.map(row => {
                        return (
                          <Table.Row key={row.key}>
                            {
                              row.columns.map((c, index) => {
                                return <Table.Cell key={`${row.key}-${index}`}>{c.value}</Table.Cell>;
                              })
                            }
                          </Table.Row>
                        );
                      })}

                    </Table.Body>
                  </>);
              }
            }
          </TableQuery >

        </Table>
      </>
    );
  }
}

export { Page };