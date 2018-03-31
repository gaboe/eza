import * as React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { DatabaseExplorer } from "../database-explorer/DatabaseExplorer";

const ContenWrapper = styled.div`
margin-top: 4em;
`;

const Routes = () => {
  return (
    <>
      <ContenWrapper>
        <Route exact={true} path="/" component={DatabaseExplorer} />
        {/* <Route path="/table/:id" component={EditRule} /> */}
      </ContenWrapper>
    </>
  );
};

export { Routes };