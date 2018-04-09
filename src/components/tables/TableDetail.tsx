import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Header, List, Button, Checkbox, Input, InputOnChangeData } from "semantic-ui-react";
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
import { isNotNullOrUndefined } from "../../utils/Utils";
import styled from "styled-components";
import { GET_APP_LAYOUT_QUERY } from "../../graphql/queries/generatedApp/GetAppLayoutQuery";

const PageNameInput = styled.div`
  margin: 0.5em 0 1em;
`;

type Props = RouteComponentProps<{ name: string, cid?: string }>;

type Column = NonNullable<TableDetailQuery["table"]>["columns"][0];

type State = {
  checkedColumns: ColumnInputType[],
  showPreview: boolean,
  pageName?: string;
};
class TableDetail extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      checkedColumns: [],
      showPreview: false,
    };
  }

  setPageName = (_: {}, data: InputOnChangeData) => {
    this.setState({ pageName: data.value });
  }

  checkForeignColumn = (c: ColumnInputType) => {
    this.checkColumn(c.schemaName, c.tableName, c.columnName, () => c);
  }

  checkColumnFromPrimaryTable = (c: Column, isFromPrimaryTable: boolean) => {
    this.checkColumn(c.schemaName, c.tableName, c.name, () => {
      const column: ColumnInputType = {
        columnName: c.name,
        schemaName: c.schemaName,
        tableName: c.tableName,
        isFromPrimaryTable: isFromPrimaryTable,
        isKey: c.isKey,
      };
      return column;
    });
  }

  checkColumn = (
    schemaName: string, tableName: string, columnName: string,
    getColumnInputType: () => ColumnInputType) => {
    if (this.getColumns(schemaName, tableName, columnName)
      .length > 0) {
      this.setState(
        {
          checkedColumns:
            this.state.checkedColumns
              .filter(x => !(x.columnName === columnName && x.tableName === tableName && x.schemaName === schemaName))
        },
        this.checkVisibility);
    } else {
      this.setState({ checkedColumns: append(getColumnInputType(), this.state.checkedColumns) }, this.checkVisibility);
    }
  }

  getColumns = (schemaName: string, tableName: string, columnName: string) => {
    return this.state.checkedColumns
      .filter(x => x.columnName === columnName && x.schemaName === schemaName && x.tableName === tableName);
  }

  checkVisibility = () => {
    if (this.state.checkedColumns.filter(x => !isNotNullOrUndefined(x.reference)).length === 0) {
      this.setState({ showPreview: false });
    } else {
      this.setState({ showPreview: true });
    }
  }

  getTable = (table: NonNullable<TableDetailQuery["table"]>) => {
    return {
      tableName: table.name,
      schemaName: table.schemaName,
      columns: this.state.checkedColumns.filter(x => {
        if (x.isFromPrimaryTable || !isNotNullOrUndefined(x.reference)) {
          return true;
        }
        if (this.state.checkedColumns
          .filter(e => e.schemaName === x.schemaName
            && e.tableName === x.tableName)
          .length > 1) {
          return true;
        }
        return false;
      })
    };
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
                                <Checkbox onClick={() => this.checkColumnFromPrimaryTable(x, true)} />
                                {` [${x.dataType}]: ${x.name}`}
                              </List.Item>
                            );
                          })
                        }
                      </List>
                      <Referenced
                        checkColumn={this.checkForeignColumn}
                        referenced={response.data.table.referenced}
                      />
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
                                    <PageNameInput>
                                      <Input placeholder="Set page name" onChange={this.setPageName} />
                                    </PageNameInput>
                                    <Button
                                      content="Save as view"
                                      onClick={
                                        () => {
                                          if (!response.loading && response.data && response.data.table) {
                                            const mutationVariables: AddPageMutationVariables = {
                                              table: this.getTable(response.data.table),
                                              pageName: this.state.pageName || response.data.table.name
                                            };
                                            mutation(
                                              {
                                                variables: mutationVariables,
                                                refetchQueries: [{ query: GET_APP_LAYOUT_QUERY }]
                                              }).then(res => {
                                                if (res && res.data && res.data.addPage.cid) {
                                                  this.props.history.push(`/app/${res.data.addPage.cid}`);
                                                }
                                              });
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
                        <AppPreview
                          pageCid={pageCid}
                          url={url}
                          table={this.getTable(response.data.table)}
                          pageName={this.state.pageName || "New Page"}
                        />
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