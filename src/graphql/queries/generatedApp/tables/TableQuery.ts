import gql from "graphql-tag";
import { TableQueryQuery, TableQueryQueryVariables } from "../../../../generated-types/types";
import { Query } from "react-apollo";

const TABLE_QUERY = gql`
query TableQuery($tableID: String!) {
  tableQuery(tableID: $tableID) {
    rows {
      key
      columns {
        columnName
        value
      }
    }
  }
}
`;

class TableQuery extends Query<TableQueryQuery, TableQueryQueryVariables> { }

export { TABLE_QUERY, TableQuery };