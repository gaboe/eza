/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetColumnsByTableNameQueryVariables {
  tableName: string,
};

export interface GetColumnsByTableNameQuery {
  columns:  Array< {
    __typename: "ColumnType",
    name: string,
    schemaName: string,
    tableName: string,
    dataType: string,
  } >,
};

export interface GetSchemasQuery {
  schemas:  Array< {
    __typename: "SchemaType",
    name: string,
  } >,
};

export interface GetTablesBySchemaQueryVariables {
  schemaName: string,
};

export interface GetTablesBySchemaQuery {
  tables:  Array< {
    __typename: "TableType",
    name: string,
    schemaName: string,
  } >,
};
