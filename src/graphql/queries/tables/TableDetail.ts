import gql from "graphql-tag";
import { Query } from "react-apollo";
import { TableDetailQuery, TableDetailQueryVariables } from "../../../generated/types";

const TABLE_DETAIL_QUERY = gql`
query TableDetail($tableName: String!) {
  table(tableName: $tableName) {
    name
    schemaName
    columns {
      position
      name
      dataType
    }
    referencing {
      constrainName
      referencedTableName
      referencedColumnName
      referencingTableName
      referencingColumnName
    }
  }
}
`;

class TableDetailQueryComponent extends Query<TableDetailQuery, TableDetailQueryVariables> { }

export { TABLE_DETAIL_QUERY, TableDetailQueryComponent };