import gql from "graphql-tag";
import { Query } from "react-apollo";
import { TableQueryPreviewQuery, TableQueryPreviewQueryVariables } from "../../../../generated-types/types";

const TABLE_QUERY_PREVIEW = gql`
query TableQueryPreview($table: TableInputType!) {
  tableQueryPreview(table: $table) {
    rows {
      columns{
        columnName
        value
      }
      key
    }
  }
}
`;

class TableQueryPreviewComponent extends Query<TableQueryPreviewQuery, TableQueryPreviewQueryVariables> { }

export { TABLE_QUERY_PREVIEW, TableQueryPreviewComponent };