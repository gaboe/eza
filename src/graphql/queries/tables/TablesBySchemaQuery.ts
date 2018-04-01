import gql from "graphql-tag";
import { GetTablesBySchemaQuery, GetTablesBySchemaQueryVariables } from "../../../generated-types/types";
import { Query } from "react-apollo";

const TABLES_BY_SCHEMA_QUERY = gql`
query GetTablesBySchema($schemaName: String!){
    tables(schemaName: $schemaName){
      name
      schemaName
    }
  }
`;

class TablesBySchemaQueryComponent extends Query<GetTablesBySchemaQuery, GetTablesBySchemaQueryVariables> { }

export { TABLES_BY_SCHEMA_QUERY, TablesBySchemaQueryComponent };