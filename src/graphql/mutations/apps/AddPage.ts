import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AddPageMutationVariables, AddPageMutation } from "../../../generated-types/types";

const ADD_PAGE_MUTATION = gql`
mutation AddPage($columns: [ColumnInputType!]!,$pageName: String!){
  addPage(columns: $columns , pageName: $pageName) {
    cid
  }
}
`;

class AddPageMutationComponent extends Mutation<AddPageMutation, AddPageMutationVariables> { }

export { ADD_PAGE_MUTATION, AddPageMutationComponent };