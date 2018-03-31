import * as React from "react";
import { Schemas } from "../schemas/Schemas";
import { Row, Col } from "react-grid-system";
import { Tables } from "../tables/Tables";

type State = {
  schemaName: string,
  tableName: string,
};

class DatabaseExplorer extends React.Component<{}, State> {
  state = { schemaName: "", tableName: "" };
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
          <h1>{this.state.schemaName}</h1>
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