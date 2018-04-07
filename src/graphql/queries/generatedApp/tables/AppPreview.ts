import gql from "graphql-tag";
import { Query } from "react-apollo";
import { AppPreviewQuery, AppPreviewQueryVariables } from "../../../../generated-types/types";

const APP_PREVIEW_QUERY = gql`
query AppPreview($table: TableInputType!, $pageName: String!) {
  appPreview(table: $table, pageName: $pageName) {
    cid
    description{
      name
    }
    menuItems{
      pageCid
      name
      rank
    }
    pages{
      cid
      name
      table{
        id
        columns{
          columnName
          tableName
          schemaName
          id
        }
      }
    }
  }
}
`;

class AppPreviewComponent extends Query<AppPreviewQuery, AppPreviewQueryVariables> { }

export { APP_PREVIEW_QUERY, AppPreviewComponent };