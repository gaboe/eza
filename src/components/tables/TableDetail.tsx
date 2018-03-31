import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Header, List, Button, Checkbox } from "semantic-ui-react";
import { TableDetailQueryComponent, TABLE_DETAIL_QUERY } from "../../graphql/queries/tables/TableDetail";
import { TableDetailQueryVariables } from "../../generated/types";
import { Col, Row } from "react-grid-system";
import { Referenced } from "./Referenced";
import { Referencing } from "./Referencing";
type Props = RouteComponentProps<{ name: string }>;
class TableDetail extends React.Component<Props> {

  render() {
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
                                <Checkbox />
                                {` [${x.dataType}]: ${x.name}`}
                              </List.Item>
                            );
                          })
                        }
                      </List>

                      <Referenced referenced={response.data.table.referenced} />
                      <Referencing referencing={response.data.table.referencing} />

                    </Col>
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

export { TableDetail };