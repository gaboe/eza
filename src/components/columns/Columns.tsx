import * as React from "react";
import { ColumsByTableQueryComponent, COLUMNS_BY_TABLE_QUERY } from "../../graphql/queries/columns/ColumnsByTableQuery";
import { GetColumnsByTableNameQueryVariables } from "../../generated/types";
import { List, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
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
                <>
                  <Header content={`Columns of ${this.props.tableName} table`} />
                  <Link to={`table/${this.props.tableName}`}>
                    <Button content="Detail" />
                  </Link>
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
                </>
              );
            }
          }
        </ColumsByTableQueryComponent>
      </>
    );
  }
}

export { Columns };