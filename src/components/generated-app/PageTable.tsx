import * as React from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";
import { Row as GridRow, Col } from "react-grid-system";

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

const Wrapper = styled.div`
margin-right: -6em;
`;

class PageTable extends React.Component<Props> {

  render() {
    if (this.props.loading) {
      return null;
    }
    if (!this.props.loading && !this.props.rows) {
      return <div>Nothing found</div>;
    }
    return (
      <>
        <Wrapper>
          <GridRow>
            <Col lg={10}>
              <Table
                celled={true}
                selectable={true}
                color="blue"
                compact={this.props.columns.length > 3 ? true : false}
              >
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
            </Col>

          </GridRow>

        </Wrapper >
      </>
    );
  }
}

export { PageTable, Row, ColumnData };