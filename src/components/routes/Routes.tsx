import * as React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { DatabaseExplorer } from "../database-explorer/DatabaseExplorer";
import { TableDetail } from "../tables/TableDetail";

const ContenWrapper = styled.div`
margin: 2em;
`;

const Routes = () => {
  return (
    <>
      <ContenWrapper>
        <Route exact={true} path="/" component={DatabaseExplorer} />
        <Route path="/table/:name" component={TableDetail} />
      </ContenWrapper>
    </>
  );
};

export { Routes };