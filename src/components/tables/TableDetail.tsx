import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Header, List, Button, Checkbox } from "semantic-ui-react";
import { TableDetailQueryComponent, TABLE_DETAIL_QUERY } from "../../graphql/queries/tables/TableDetail";
import {
  TableDetailQueryVariables, TableDetailQuery, ColumnInputType, AddPageMutationVariables
} from "../../generated-types/types";
import { Col, Row } from "react-grid-system";
import { Referenced } from "./Referenced";
import { Referencing } from "./Referencing";
import { append } from "ramda";
import { AddPageMutationComponent, ADD_PAGE_MUTATION } from "../../graphql/mutations/apps/AddPage";
import { AppPreview } from "./AppPreview";
type Props = RouteComponentProps<{ name: string, cid?: string }>;

type Column = NonNullable<TableDetailQuery["table"]>["columns"][0];

type State = {
  checkedColumns: ColumnInputType[],
  showPreview: boolean
};
class TableDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checkedColumns: [],
      showPreview: false
    };
  }
  checkColumn = (c: Column) => {
    if (this.state.checkedColumns.filter(x => x.name === c.name).length > 0) {
      this.setState({ checkedColumns: this.state.checkedColumns.filter(x => x.name !== c.name) }, this.checkVisibility);
    } else {
      const isPrimary = this.props.match.params.name === c.tableName;
      const column: ColumnInputType = {
        name: c.name,
        dataType: c.dataType,
        table: { isPrimary: isPrimary, schemaName: c.schemaName, tableName: c.tableName }
      };
      this.setState({ checkedColumns: append(column, this.state.checkedColumns) }, this.checkVisibility);
    }
  }

  checkVisibility = () => {
    if (this.state.checkedColumns.length === 0) {
      this.setState({ showPreview: false });
    } else {
      this.setState({ showPreview: true });
    }
  }

  render() {
    const pageCid = this.props.match.params.cid;
    const url = `/table/${this.props.match.params.name}`;
    const variables: TableDetailQueryVariables = {
      tableName: this.props.match.params.name
    };
    return (
      <>
        <Header as="h1">{variables.tableName}</Header>
        <TableDetailQueryComponent query={TABLE_DETAIL_QUERY} variables={variables}>
          {
            response => {
              if (response.loading || !response.data || !response.data.table) {
                return (
                  <>
                    <p>Loading...</p>
                  </>
                );
              }

              return (
                <>
                  <Row>
                    <Col md={6} lg={3}>
                      <Header as="h4" >
                        Schema: {response.data.table.schemaName}
                      </Header>
                      <Link to={`/${response.data.table.schemaName}-${response.data.table.name}`}>
                        <Button content="Back" />
                      </Link>
                      <Header as="h5" >
                        Columns:
                      </Header>
                      <List size="large" divided={true} celled={true}>
                        {
                          response.data.table.columns.map(x => {
                            return (
                              <List.Item key={x.name} >
                                <Checkbox onClick={() => this.checkColumn(x)} />
                                {` [${x.dataType}]: ${x.name}`}
                              </List.Item>
                            );
                          })
                        }
                      </List>

                      <Referenced checkColumn={this.checkColumn} referenced={response.data.table.referenced} />
                      <Referencing referencing={response.data.table.referencing} />

                      <AddPageMutationComponent mutation={ADD_PAGE_MUTATION}>
                        {
                          (mutation, data) => {
                            if (data.loading
                              || this.state.checkedColumns.length === 0) {
                              return (null);
                            }

                            return (
                              <>
                                <Row>
                                  <Col xs={6}>
                                    <Button
                                      content="Save as view"
                                      onClick={
                                        () => {
                                          if (!response.loading && response.data && response.data.table) {
                                            const mutationVariables: AddPageMutationVariables = {
                                              columns: this.state.checkedColumns,
                                              pageName: response.data.table.name
                                            };
                                            console.log(mutationVariables);
                                            mutation({ variables: mutationVariables });
                                          }

                                        }}
                                    />
                                  </Col>

                                </Row>
                              </>
                            );
                          }
                        }
                      </AddPageMutationComponent>
                    </Col>

                    {this.state.showPreview &&
                      <Col sm={6} lg={9}>
                        <AppPreview pageCid={pageCid} url={url} columns={this.state.checkedColumns} />
                      </Col>
                    }
                  </Row>

                </>
              );
            }
          }
        </TableDetailQueryComponent >

      </>
    );
  }
}

export { TableDetail, Column };