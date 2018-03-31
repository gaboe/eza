import * as React from "react";
import { Schemas } from "../schemas/Schemas";
import { Row, Col } from "react-grid-system";
import { Tables } from "../tables/Tables";
import { RouteComponentProps } from "react-router-dom";

type State = {
  schemaName: string,
  tableName: string,
};

type Props =
  RouteComponentProps<{
    schemaName: string,
    tableName: string
  }>;

class DatabaseExplorer extends React.Component<Props, State> {

  state = {
    schemaName: this.props.match.params.schemaName,
    tableName: this.props.match.params.tableName
  };
  onSchemaClick = (schemaName: string) => {
    this.setState({ schemaName, tableName: "" });
  }

  onTableClick = (tableName: string) => {
    this.setState({ tableName });
  }

  renderTables = () => {
    if (this.state.schemaName) {
      return (
        <>
          <Tables
            schemaName={this.state.schemaName}
            tableName={this.state.tableName}
            onTableClick={this.onTableClick}
          />
        </>
      );
    }
    return null;
  }

  render() {
    return (
      <>
        <Row>
          <Col sm={3}>
            <Schemas onSchemaClick={this.onSchemaClick} />
          </Col>
          <Col sm={9}>
            {this.renderTables()}
          </Col>
        </Row>
      </>
    );
  }
}

export { DatabaseExplorer };