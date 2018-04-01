import gql from "graphql-tag";
import { GetAppLayoutQuery, GetAppLayoutQueryVariables } from "../../../generated-types/types";
import { Query } from "react-apollo";

const GET_APP_LAYOUT_QUERY = gql`
  query GetAppLayout($cid: String!) {
    app(cid: $cid) {
      cid
      description {
        name
      }
      menuItems {
        name
        rank
      }
    }
  }
`;

class AppLayoutQueryComponent extends Query<GetAppLayoutQuery, GetAppLayoutQueryVariables> { }

export { GET_APP_LAYOUT_QUERY, AppLayoutQueryComponent };