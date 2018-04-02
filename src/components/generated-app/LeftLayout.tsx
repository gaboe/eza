import * as React from "react";
import { Sidebar, Segment, Menu } from "semantic-ui-react";
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
  urlPath: string,
  loading: boolean
};

type State = {
  menuItems: NonNullable<GetAppLayoutQuery["app"]>["menuItems"],
};

class SidebarLeftOverlay extends React.Component<Props, State> {

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (nextProps.loading && nextProps.menuItems.length === 0) {
      return null;
    }
    return { menuItems: nextProps.menuItems };
  }

  constructor(props: Props) {
    super(props);
    this.state = { menuItems: [] };
  }

  render() {
    const rankName: string = nameof<Props["menuItems"][0]>("rank");
    return (
      <>
        <Sidebar.Pushable as={Segment}>
          <Pushable>
            <Sidebar as={Menu} width="thin" visible={true} icon="labeled" vertical={true} inverted={true}>
              {
                this.state.menuItems.length > 0 && orderBy(this.state.menuItems, [`${rankName}`], ["asc"]).map(x => {
                  return (
                    <Menu.Item key={x.name} name="database-explorer">
                      <Link to={`${this.props.urlPath}/${x.pageCid}`}>
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