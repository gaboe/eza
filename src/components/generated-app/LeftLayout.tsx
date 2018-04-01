import * as React from "react";
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { GetAppLayoutQuery } from "../../generated-types/types";
import { nameof } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { orderBy } from "lodash";

const Pushable = styled.div`
min-height: calc(85vh);
`;

type Props = {
  menuItems: NonNullable<GetAppLayoutQuery["app"]>["menuItems"],
};

class SidebarLeftOverlay extends React.Component<Props> {
  render() {
    const rankName: string = nameof<Props["menuItems"][0]>("rank");

    return (
      <>
        <Sidebar.Pushable as={Segment}>
          <Pushable>
            <Sidebar as={Menu} width="thin" visible={true} icon="labeled" vertical={true} inverted={true}>
              {
                this.props.menuItems.length > 0 && orderBy(this.props.menuItems, [`${rankName}`], ["desc"]).map(x => {
                  return (
                    <Menu.Item key={x.name} name="database-explorer">
                      <Link to="/app">
                        <Icon name="find" />
                        {x.name}
                      </Link>
                    </Menu.Item>
                  );
                })}
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic={true}>
                {this.props.children}
              </Segment>
            </Sidebar.Pusher>
          </Pushable>
        </Sidebar.Pushable>
      </>
    );
  }
}

export { SidebarLeftOverlay as LeftLayout };