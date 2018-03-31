import * as React from "react";
import { SchemasQueryComponent, SCHEMAS_QUERY } from "../../graphql/queries/schemas/SchemasQuery";
import { List } from "semantic-ui-react";
class Schemas extends React.Component {
  render() {
    return (
      <>
        <SchemasQueryComponent query={SCHEMAS_QUERY}>
          {response => {
            if (!response.loading && response.data) {
              return (
                <>
                  <List animated={true} celled={true}>
                    {
                      response.data.schemas.map(x => {
                        return (
                          <List.Item key={x.name}>
                            {x.name}
                          </List.Item>
                        );
                      })
                    }
                  </List>

                </>
              );
            }
            return null;
          }}
        </SchemasQueryComponent >
      </>
    );
  }
}

export { Schemas };