import * as React from "react";
import { ColumnInputType, TableQueryPreviewQueryVariables } from "../../generated-types/types";
import { Header, Table } from "semantic-ui-react";
import {
  TableQueryPreviewComponent, TABLE_QUERY_PREVIEW
} from "../../graphql/queries/generatedApp/tables/TableQueryPreview";

type Props = {
  columns: ColumnInputType[],
};

class PagePreview extends React.Component<Props> {

  render() {
    const variables: TableQueryPreviewQueryVariables = {
      columns: this.props.columns
    };
    return (
      <>
        <Header as="h3" content={"New page"} />
        <Table celled={true} selectable={true}>
          <Table.Header>
            <Table.Row>
              {
                this.props.columns.map(x =>
                  <Table.HeaderCell key={x.name}>{x.name}</Table.HeaderCell>)
              }
            </Table.Row>
          </Table.Header>
          <TableQueryPreviewComponent query={TABLE_QUERY_PREVIEW} variables={variables} >
            {
              response => {
                if (response.loading || !response.data) {
                  return <div>Loading</div>;
                }
                if (!response.data.tableQueryPreview || !response.data.tableQueryPreview.rows) {
                  return <div>Nothing found</div>;
                }
                return (
                  <>
                    <Table.Body>
                      {response.data.tableQueryPreview.rows.map(row => {
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
          </TableQueryPreviewComponent >
        </Table>
      </>
    );
  }
}

export { PagePreview };