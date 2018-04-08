import * as React from "react";
import { List, Header, Button } from "semantic-ui-react";
import {
  TableDetailQuery,
  ReferenceInputType,
  ColumnInputType,
} from "../../generated-types/types";
import { find } from "lodash";
import { append } from "ramda";
import { ReferenceColumn } from "./ReferenceColumn";
type Props = {
  referenced: NonNullable<TableDetailQuery["table"]>["referenced"];
  checkColumn: (column: ColumnInputType) => void;
};

type State = {
  displayedTables: string[];
};

class Referenced extends React.Component<Props, State> {

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
                  <ReferenceColumn
                    checkColumn={this.props.checkColumn}
                    tableName={x.referencedTableName}
                    keyColumn={x.referencingColumnName}
                    displayedTables={this.state.displayedTables}
                  />
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