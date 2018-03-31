import * as React from "react";
import { TablesBySchemaQueryComponent, TABLES_BY_SCHEMA_QUERY } from "../../graphql/queries/tables/TablesBySchemaQuery";
import { List, Header } from "semantic-ui-react";
import { GetTablesBySchemaQueryVariables } from "../../generated/types";
import { Columns } from "../columns/Columns";
import { Row, Col } from "react-grid-system";

type Props = {
  schemaName: string,
  tableName: string,
  onTableClick: (tableName: string) => void,
};

class Tables extends React.Component<Props> {
  render() {
    const variables: GetTablesBySchemaQueryVariables = {
      schemaName: this.props.schemaName
    };
    return (
      <>
        <Row>
          <Col sm={6}>
            <TablesBySchemaQueryComponent query={TABLES_BY_SCHEMA_QUERY} variables={variables}>
              {
                response => {
                  if (response.loading || !response.data) {
                    return null;
                  }
                  return (
                    <>
                      <Header content={`Tables of ${this.props.schemaName} schema `} />
                      <List size="large" divided={true} animated={true} celled={true}>
                        {
                          response.data.tables.map(x => {
                            return (
                              <List.Item key={x.name} onClick={() => this.props.onTableClick(x.name)}>
                                {x.name}
                              </List.Item>
                            );
                          })
                        }
                      </List>
                    </>
                  );
                }
              }
            </TablesBySchemaQueryComponent >
          </Col>
          {
            this.props.tableName &&
            <>
              <Col sm={6}>
                <Columns tableName={this.props.tableName} />
              </Col>
            </>

          }

        </Row>
      </>
    );
  }
}

export { Tables };