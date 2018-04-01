import * as React from "react";
import { List, Header } from "semantic-ui-react";
import { TableDetailQuery } from "../../generated-types/types";

type Props = {
  referenced: NonNullable<TableDetailQuery["table"]>["referenced"]
};

class Referenced extends React.Component<Props> {
  render() {
    return (
      <>
        <Header as="h5" >
          Referenced tables:
                      </Header>
        <List size="large" divided={true} celled={true}>
          {
            this.props.referenced.map(x => {
              return (
                <List.Item key={x.referencedTableName} >
                  <p>
                    From table
                    <strong>
                      {` ${x.referencedTableName} `}
                    </strong>
                    on {x.referencedColumnName}
                  </p>
                  <p>
                    With column on {x.referencingColumnName} in {x.referencingTableName}
                  </p>
                </List.Item>
              );
            })
          }
        </List>
      </>
    );
  }
}

export { Referenced };