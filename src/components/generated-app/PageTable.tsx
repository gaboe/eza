import * as React from "react";
import { Table } from "semantic-ui-react";

type ColumnData = { columnName: string, value: string | null };

type Row = {
  key: string;
  columns: Array<ColumnData>;
};

type Props = {
  columns: string[];
  rows?: Row[];
  loading: boolean
};

class PageTable extends React.Component<Props> {

  render() {
    if (this.props.loading) {
      return <div>Loading ...</div>;
    }
    if (!this.props.loading && !this.props.rows) {
      return <div>Nothing found</div>;
    }
    return (
      <>
        <Table celled={true} selectable={true}>
          <Table.Header>
            <Table.Row>
              {this.props.columns.map(x => <Table.HeaderCell key={x}>{x}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.rows && this.props.rows.map(row => {
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
        </Table>
      </>
    );
  }
}

export { PageTable, Row, ColumnData };