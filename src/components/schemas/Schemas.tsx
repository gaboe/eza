import * as React from "react";
import { SchemasQueryComponent, SCHEMAS_QUERY } from "../../graphql/queries/schemas/SchemasQuery";

class Schemas extends React.Component {
    render() {
        return (
            <>
                <SchemasQueryComponent query={SCHEMAS_QUERY}>
                    {response => {
                        return (
                            <>
                                {
                                    !response.loading && response.data && response.data.schemas.map(x => {
                                        return <div key={x.name}> {x.name}</div>;
                                    })
                                }
                            </>
                        );
                    }}
                </SchemasQueryComponent >
            </>
        );
    }
}

export { Schemas };