import * as React from "react";
import { TablesBySchemaQueryComponent, TABLES_BY_SCHEMA_QUERY } from "../../graphql/queries/tables/TablesBySchemaQuery";
import { List } from "semantic-ui-react";
import { GetTablesBySchemaQueryVariables } from "../../generated/types";

type Props = {
  schemaName: string,
};

class Tables extends React.Component<Props> {
  render() {
    const variables: GetTablesBySchemaQueryVariables = {
      schemaName: this.props.schemaName
    };
    return (
      <TablesBySchemaQueryComponent query={TABLES_BY_SCHEMA_QUERY} variables={variables}>
        {
          response => {
            if (response.loading || !response.data) {
              return null;
            }
            return (
              <List size="large" divided={true} animated={true} celled={true}>
                {
                  response.data.tables.map(x => {
                    return (
                      <List.Item key={x.name}>
                        {x.name}
                      </List.Item>
                    );
                  })
                }
              </List>
            );
          }
        }
      </TablesBySchemaQueryComponent >

    );
  }
}

export { Tables };