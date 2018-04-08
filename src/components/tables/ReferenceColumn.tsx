import * as React from "react";
import { GetColumnsByTableNameQueryVariables, ColumnInputType } from "../../generated-types/types";
import { find } from "lodash";
import { ColumsByTableQueryComponent, COLUMNS_BY_TABLE_QUERY } from "../../graphql/queries/columns/ColumnsByTableQuery";
import { List } from "semantic-ui-react";
import { ReferenceCheckbox } from "./ReferenceCheckbox";

type Props = {
  tableName: string;
  displayedTables: string[];
  keyColumn: string;
  checkColumn: (column: ColumnInputType) => void;
};

const ReferenceColumn: React.SFC<Props> = props => {
  const variables: GetColumnsByTableNameQueryVariables = {
    tableName: props.tableName
  };
  const item = find(props.displayedTables, x => x === props.tableName);
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
                    >
                      <ReferenceCheckbox column={x} keyColumn={props.keyColumn} checkColumn={props.checkColumn} />
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
};

export { ReferenceColumn };