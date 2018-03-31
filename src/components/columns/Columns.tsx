import * as React from "react";
import { ColumsByTableQueryComponent, COLUMNS_BY_TABLE_QUERY } from "../../graphql/queries/columns/ColumnsByTableQuery";
import { GetColumnsByTableNameQueryVariables } from "../../generated/types";
import { List } from "semantic-ui-react";

type Props = {
  tableName: string,
};

class Columns extends React.Component<Props> {
  render() {
    const variables: GetColumnsByTableNameQueryVariables = {
      tableName: this.props.tableName
    };
    return (
      <>
        <ColumsByTableQueryComponent query={COLUMNS_BY_TABLE_QUERY} variables={variables}>
          {
            response => {
              if (response.loading || !response.data) {
                return null;
              }
              return (
                <List size="large" divided={true} animated={true} celled={true}>
                  {
                    response.data.columns.map(x => {
                      return (
                        <List.Item key={x.name} >
                          {x.name}
                        </List.Item>
                      );
                    })
                  }
                </List>
              );
            }
          }
        </ColumsByTableQueryComponent>
      </>
    );
  }
}

export { Columns };