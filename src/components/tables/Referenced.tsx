import * as React from "react";
import { List, Header, Button, Checkbox } from "semantic-ui-react";
import {
  TableDetailQuery,
  GetColumnsByTableNameQueryVariables,
  ReferenceInputType,
  ColumnInputType
} from "../../generated-types/types";
import { find } from "lodash";
import { ColumsByTableQueryComponent, COLUMNS_BY_TABLE_QUERY } from "../../graphql/queries/columns/ColumnsByTableQuery";
import { append } from "ramda";
type Props = {
  referenced: NonNullable<TableDetailQuery["table"]>["referenced"];
  checkColumn: (column: ColumnInputType) => void;
};

type State = {
  displayedTables: string[];
};

class Referenced extends React.Component<Props, State> {
  renderColumns = (tableName: string) => {
    const variables: GetColumnsByTableNameQueryVariables = {
      tableName
    };
    const item = find(this.state.displayedTables, x => x === tableName);
    if (item === undefined) {
      return null;
    } else {
      return (
        <ColumsByTableQueryComponent query={COLUMNS_BY_TABLE_QUERY} variables={variables}>
          {
            response => {
              if (!response.loading && response.data && response.data.columns) {
                return (
                  response.data.columns.map(x => {
                    return (
                      <List.Item
                        key={x.name}
                        onClick={() => this.props.checkColumn(
                          {
                            columnName: x.name,
                            isFromPrimaryTable: false,
                            tableName: x.tableName,
                            schemaName: x.schemaName
                          })}
                      >
                        <Checkbox />
                        {` [${x.dataType}]: ${x.name}`}
                      </List.Item>
                    );
                  })
                );
              }
              return null;
            }
          }
        </ColumsByTableQueryComponent>
      );
    }
  }
  constructor(props: Props) {
    super(props);
    this.state = { displayedTables: [] };
  }
  toggleTableColumns = (schema: string, tableName: string, column: string, primaryKey: string) => {
    find(this.state.displayedTables, x => x === tableName)
      ? this.setState({ displayedTables: this.state.displayedTables.filter(x => x !== tableName) })
      : this.setState({ displayedTables: append(tableName, this.state.displayedTables) });
    const reference: ReferenceInputType = {
      primaryKey: primaryKey,
      type: "JOIN"
    };

    this.props.checkColumn(
      {
        reference: reference,
        tableName: tableName,
        isFromPrimaryTable: false,
        columnName: column,
        schemaName: schema
      });
  }

  render() {
    return (
      <>
        <Header as="h5" >
          Referenced tables:
                      </Header>
        <List size="large" divided={true} celled={true}>
          {
            this.props.referenced.map(x => {
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
                  {
                    this.renderColumns(x.referencedTableName)
                  }
                  <Button
                    size="mini"
                    content="Show columns"
                    onClick={() =>
                      this.toggleTableColumns(
                        x.referencedSchemaName,
                        x.referencedTableName,
                        x.referencedColumnName,
                        x.referencingColumnName)
                    }
                  />
                </List.Item>
              );
            })
          }
        </List>
      </>
    );
  }
}

export { Referenced };