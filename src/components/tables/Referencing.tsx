import * as React from "react";
import { List, Header } from "semantic-ui-react";
import { TableDetailQuery } from "../../generated/types";

type Props = {
  referencing: NonNullable<TableDetailQuery["table"]>["referencing"]
};

class Referencing extends React.Component<Props> {
  render() {
    return (
      <>
        <Header as="h5" >
          Referencing tables:
                      </Header>
        <List size="large" divided={true} celled={true}>
          {
            this.props.referencing.map(x => {
              return (
                <List.Item key={x.referencedTableName} >
                  <p>
                    To table
                              <strong>
                      {` ${x.referencingTableName} `}
                    </strong>
                    on {x.referencingColumnName}
                  </p>
                  <p>
                    With column on {x.referencedColumnName} in {x.referencedTableName}
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

export { Referencing };