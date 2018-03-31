import * as React from "react";
import { SchemasQueryComponent, SCHEMAS_QUERY } from "../../graphql/queries/schemas/SchemasQuery";
import { List } from "semantic-ui-react";

type Props = {
  onSchemaClick: (schemaName: string) => void;
};

class Schemas extends React.Component<Props> {
  render() {
    return (
      <>
        <SchemasQueryComponent query={SCHEMAS_QUERY}>
          {response => {
            if (!response.loading && response.data) {
              return (
                <>
                  <List size="large" divided={true} animated={true} celled={true}>
                    {
                      response.data.schemas.map(x => {
                        return (
                          <List.Item key={x.name} onClick={() => this.props.onSchemaClick(x.name)}>
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