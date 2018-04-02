import gql from "graphql-tag";
import { Query } from "react-apollo";
import { AppPreviewQuery, AppPreviewQueryVariables } from "../../../../generated-types/types";

const APP_PREVIEW_QUERY = gql`
query AppPreview($columns: [ColumnInputType!]!, $pageName: String!) {
  appPreview(columns: $columns, pageName: $pageName) {
    cid
    description {
      name
    }
    menuItems {
      pageCid
      name
      rank
    }
    pages {
      cid
      name
      table {
        id
        columns {
          dbSchema
          dbTable
          dbColumn
          dbDataType
        }
      }
    }
  }
}
`;

class AppPreviewComponent extends Query<AppPreviewQuery, AppPreviewQueryVariables> { }

export { APP_PREVIEW_QUERY, AppPreviewComponent };