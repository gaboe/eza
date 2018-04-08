import * as React from "react";
import { GetColumnsByTableNameQuery, ColumnInputType } from "../../generated-types/types";
import { Checkbox, Popup } from "semantic-ui-react";

type DbColumn = GetColumnsByTableNameQuery["columns"][0];

type Props = {
  column: DbColumn;
  keyColumn: string;
  checkColumn: (column: ColumnInputType) => void;

};

const ReferenceCheckbox: React.SFC<Props> = (props) => {
  if (props.column.name === props.keyColumn) {
    return (
      <Popup
        trigger={<Checkbox
          disabled={true}
          readOnly={true}
        />}
        content="Use column from primary table"
      />
    );
  }
  return (
    <Checkbox
      onClick={() => props.checkColumn(
        {
          columnName: props.column.name,
          isFromPrimaryTable: false,
          tableName: props.column.tableName,
          schemaName: props.column.schemaName
        })}
    />
  );
};

export { ReferenceCheckbox };