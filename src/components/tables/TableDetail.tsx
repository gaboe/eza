import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Header, List, Button } from "semantic-ui-react";
import { TableDetailQueryComponent, TABLE_DETAIL_QUERY } from "../../graphql/queries/tables/TableDetail";
import { TableDetailQueryVariables } from "../../generated/types";
type Props = RouteComponentProps<{ name: string }>;
class TableDetail extends React.Component<Props> {

  render() {
    console.log(this.props);
    const name = this.props.match.params.name;
    const variables: TableDetailQueryVariables = {
      tableName: name
    };
    return (
      <>
        <Header as="h1">{name}</Header>
        <TableDetailQueryComponent query={TABLE_DETAIL_QUERY} variables={variables}>
          {
            response => {
              console.log(response);
              if (response.loading || !response.data || !response.data.table) {
                return (
                  <>
                    <p>Loading...</p>
                  </>
                );
              }
              return (
                <>
                  <Header as="h4" >
                    Schema: {response.data.table.schemaName}
                  </Header>
                  <Header as="h5" >
                    Columns:
                  </Header>
                  <List size="large" divided={true} animated={true} celled={true}>
                    {
                      response.data.table.columns.map(x => {
                        return (
                          <List.Item key={x.name} >
                            [{x.dataType}]: {x.name}
                          </List.Item>
                        );
                      })
                    }
                  </List>
                </>
              );
            }
          }
        </TableDetailQueryComponent >
        <Link to="/">
          <Button content="Back" />

        </Link>

      </>
    );
  }
}

export { TableDetail };