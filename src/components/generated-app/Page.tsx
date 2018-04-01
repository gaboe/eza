import * as React from "react";
import { GetAppLayoutQuery } from "../../generated-types/types";
import { Header, Table } from "semantic-ui-react";

type Props = {
  page: NonNullable<GetAppLayoutQuery["app"]>["pages"][0]
};

class Page extends React.Component<Props> {
  render() {
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

          <Table.Body>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Denied</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell >Approved</Table.Cell>
              <Table.Cell >Requires call</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell >Denied</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  }
}

export { Page };