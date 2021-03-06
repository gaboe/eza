import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AddPageMutationVariables, AddPageMutation } from "../../../generated-types/types";

const ADD_PAGE_MUTATION = gql`
mutation AddPage($table: TableInputType!,$pageName: String!){
  addPage(table: $table , pageName: $pageName) {
    cid
  }
}
`;

class AddPageMutationComponent extends Mutation<AddPageMutation, AddPageMutationVariables> { }

export { ADD_PAGE_MUTATION, AddPageMutationComponent };