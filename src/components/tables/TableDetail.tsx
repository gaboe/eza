import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Header, List, Button } from "semantic-ui-react";
import { TableDetailQueryComponent, TABLE_DETAIL_QUERY } from "../../graphql/queries/tables/TableDetail";
import { TableDetailQueryVariables } from "../../generated/types";
import { Col, Row } from "react-grid-system";
type Props = RouteComponentProps<{ name: string }>;
class TableDetail extends React.Component<Props> {

  render() {
    console.log(this.props);
    const name = this.props.match.params.name;
    const variables: TableDetailQueryVariables = {
      tableName: name
    };
    return (
      <>
        <Header as="h1">{name}</Header>
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
                    <Col md={6}>
                      <Header as="h4" >
                        Schema: {response.data.table.schemaName}
                      </Header>
                      <Header as="h5" >
                        Columns:
                  </Header>
                      <List size="large" divided={true} celled={true}>
                        {
                          response.data.table.columns.map(x => {
                            return (
                              <List.Item key={x.name} >
                                [{x.dataType}]: {x.name}
                              </List.Item>
                            );
                          })
                        }
                      </List>

                      <Header as="h5" >
                        Referenced tables:
                  </Header>
                      <List size="large" divided={true} celled={true}>
                        {
                          response.data.table.referenced.map(x => {
                            return (
                              <List.Item key={x.referencedTableName} >
                                <p>
                                  From table
                                  <strong>
                                    {` ${x.referencedTableName} `}
                                  </strong>
                                  on {x.referencedColumnName}
                                </p>
                                <p>
                                  With column on {x.referencingColumnName} in {x.referencingTableName}
                                </p>
                              </List.Item>
                            );
                          })
                        }
                      </List>
                      <Header as="h5" >
                        Referencing tables:
                  </Header>
                      <List size="large" divided={true} celled={true}>
                        {
                          response.data.table.referencing.map(x => {
                            return (
                              <List.Item key={x.referencedTableName} >
                                <p>
                                  To table
                              <strong>
                                    {` ${x.referencingTableName} `}
                                  </strong>
                                  on {x.referencingColumnName}
                                </p>
                                <p>
                                  With column on {x.referencedColumnName} in {x.referencedTableName}
                                </p>
                              </List.Item>
                            );
                          })
                        }
                      </List>
                    </Col>
                  </Row>

                </>
              );
            }
          }
        </TableDetailQueryComponent >
        <Link to="/">
          <Button content="Back" />

        </Link>

      </>
    );
  }
}

export { TableDetail };