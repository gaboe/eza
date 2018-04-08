/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface TableInputType {
  schemaName: string,
  tableName: string,
  columns: Array< ColumnInputType >,
};

export interface ColumnInputType {
  schemaName: string,
  tableName: string,
  columnName: string,
  isFromPrimaryTable: boolean,
  reference?: ReferenceInputType | null,
};

export interface ReferenceInputType {
  primaryKey: string,
  type: string,
};

export interface AddPageMutationVariables {
  table: TableInputType,
  pageName: string,
};

export interface AddPageMutation {
  addPage:  {
    __typename: "AppType",
    cid: string,
  },
};

export interface GetColumnsByTableNameQueryVariables {
  tableName: string,
};

export interface GetColumnsByTableNameQuery {
  columns:  Array< {
    __typename: "DbColumnType",
    name: string,
    schemaName: string,
    tableName: string,
    dataType: string,
  } >,
};

export interface GetAppLayoutQueryVariables {
  cid: string,
};

export interface GetAppLayoutQuery {
  app:  {
    __typename: "AppType",
    cid: string,
    description:  {
      __typename: "AppDescriptionType",
      name: string,
    },
    menuItems:  Array< {
      __typename: "MenuItemType",
      pageCid: string,
      name: string,
      rank: number,
    } >,
    pages:  Array< {
      __typename: "PageType",
      cid: string,
      name: string,
      table:  {
        __typename: "TableType",
        id: string,
        columns:  Array< {
          __typename: "ColumnType",
          columnName: string,
          reference:  {
            __typename: "ColumnReferenceType",
            primaryKey: string,
            type: string,
          } | null,
        } >,
      },
    } >,
  } | null,
};

export interface AppPreviewQueryVariables {
  table: TableInputType,
  pageName: string,
};

export interface AppPreviewQuery {
  appPreview:  {
    __typename: "AppType",
    cid: string,
    description:  {
      __typename: "AppDescriptionType",
      name: string,
    },
    menuItems:  Array< {
      __typename: "MenuItemType",
      pageCid: string,
      name: string,
      rank: number,
    } >,
    pages:  Array< {
      __typename: "PageType",
      cid: string,
      name: string,
      table:  {
        __typename: "TableType",
        id: string,
        schemaName: string,
        tableName: string,
        columns:  Array< {
          __typename: "ColumnType",
          columnName: string,
          tableName: string,
          schemaName: string,
          id: string,
          isFromPrimaryTable: boolean,
          reference:  {
            __typename: "ColumnReferenceType",
            primaryKey: string,
            type: string,
          } | null,
        } >,
      },
    } >,
  } | null,
};

export interface TableQueryQueryVariables {
  tableID: string,
};

export interface TableQueryQuery {
  tableQuery:  {
    __typename: "TableQueryResponseType",
    rows:  Array< {
      __typename: "ResponseRowType",
      key: string,
      columns:  Array< {
        __typename: "ResponseColumnType",
        columnName: string,
        value: string | null,
      } >,
    } >,
  } | null,
};

export interface TableQueryPreviewQueryVariables {
  table: TableInputType,
};

export interface TableQueryPreviewQuery {
  tableQueryPreview:  {
    __typename: "TableQueryResponseType",
    rows:  Array< {
      __typename: "ResponseRowType",
      columns:  Array< {
        __typename: "ResponseColumnType",
        columnName: string,
        value: string | null,
      } >,
      key: string,
    } >,
  } | null,
};

export interface GetSchemasQuery {
  schemas:  Array< {
    __typename: "DbSchemaType",
    name: string,
  } >,
};

export interface TableDetailQueryVariables {
  tableName: string,
};

export interface TableDetailQuery {
  table:  {
    __typename: "DbTableType",
    name: string,
    schemaName: string,
    columns:  Array< {
      __typename: "DbColumnType",
      schemaName: string,
      tableName: string,
      name: string,
      dataType: string,
    } >,
    referencing:  Array< {
      __typename: "DbReferenceConstrainType",
      referencedSchemaName: string,
      referencedTableName: string,
      referencedColumnName: string,
      referencingSchemaName: string,
      referencingTableName: string,
      referencingColumnName: string,
    } >,
    referenced:  Array< {
      __typename: "DbReferenceConstrainType",
      referencedSchemaName: string,
      referencedTableName: string,
      referencedColumnName: string,
      referencingSchemaName: string,
      referencingTableName: string,
      referencingColumnName: string,
    } >,
  } | null,
};

export interface GetTablesBySchemaQueryVariables {
  schemaName: string,
};

export interface GetTablesBySchemaQuery {
  tables:  Array< {
    __typename: "DbTableType",
    name: string,
    schemaName: string,
  } >,
};
