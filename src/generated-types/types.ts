/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface ColumnInputType {
  schemaName: string,
  tableName: string,
  name: string,
  dataType: string,
};

export interface AddPageMutationVariables {
  columns: Array< ColumnInputType >,
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
    __typename: "ColumnType",
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
        __typename: "PageTableType",
        id: string,
        columns:  Array< {
          __typename: "PageTableColumnTyp",
          dbSchema: string,
          dbTable: string,
          dbColumn: string,
          dbDataType: string,
        } >,
      },
    } >,
  } | null,
};

export interface AppPreviewQueryVariables {
  columns: Array< ColumnInputType >,
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
      table:  {
        __typename: "PageTableType",
        id: string,
        columns:  Array< {
          __typename: "PageTableColumnTyp",
          dbSchema: string,
          dbTable: string,
          dbColumn: string,
          dbDataType: string,
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
  columns: Array< ColumnInputType >,
};

export interface TableQueryPreviewQuery {
  tableQueryPreview:  {
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
      schemaName: string,
      tableName: string,
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
    } >,
    referenced:  Array< {
      __typename: "ReferenceConstrainType",
      constrainName: string,
      referencedTableName: string,
      referencedColumnName: string,
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
    __typename: "TableType",
    name: string,
    schemaName: string,
  } >,
};
