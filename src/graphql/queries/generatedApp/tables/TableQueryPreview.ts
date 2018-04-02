import gql from "graphql-tag";
import { Query } from "react-apollo";
import { TableQueryPreviewQuery, TableQueryPreviewQueryVariables } from "../../../../generated-types/types";

const TABLE_QUERY_PREVIEW = gql`
query TableQueryPreview($columns: [ColumnInputType!]!) {
  tableQueryPreview(columns: $columns) {
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

class TableQueryPreviewComponent extends Query<TableQueryPreviewQuery, TableQueryPreviewQueryVariables> { }

export { TABLE_QUERY_PREVIEW, TableQueryPreviewComponent };