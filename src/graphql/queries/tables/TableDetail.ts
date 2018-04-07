import gql from "graphql-tag";
import { Query } from "react-apollo";
import { TableDetailQuery, TableDetailQueryVariables } from "../../../generated-types/types";

const TABLE_DETAIL_QUERY = gql`
query TableDetail($tableName: String!) {
  table(tableName: $tableName) {
    name
    schemaName
    columns {
      schemaName
      tableName
      name
      dataType
    }
    referencing {
      referencedSchemaName
      referencedTableName
      referencedColumnName
      referencingSchemaName
      referencingTableName
      referencingColumnName
    },
    referenced {
      referencedSchemaName
      referencedTableName
      referencedColumnName
      referencingSchemaName
      referencingTableName
      referencingColumnName
    }
  }
}
`;

class TableDetailQueryComponent extends Query<TableDetailQuery, TableDetailQueryVariables> { }

export { TABLE_DETAIL_QUERY, TableDetailQueryComponent };