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

export interface TableDetailQueryVariables {
  tableName: string,
};

export interface TableDetailQuery {
  table:  {
    __typename: "TableType",
    name: string,
    schemaName: string,
    columns:  Array< {
      __typename: "ColumnType",
      position: number,
      name: string,
      dataType: string,
    } >,
    referencing:  Array< {
      __typename: "ReferenceConstrainType",
      constrainName: string,
      referencedTableName: string,
      referencedColumnName: string,
      referencingTableName: string,
      referencingColumnName: string,
    } | null >,
  } | null,
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
