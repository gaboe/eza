import gql from "graphql-tag";

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

export { TABLE_QUERY_PREVIEW };