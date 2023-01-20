import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomNav = styled(Nav)`
  margin: 0.5rem 0 3rem 0;
`;

const CustomLink = styled(Link)`
  border-bottom: 1px solid gray;
  font-size: 20px;
  color: #0000ff9e;
  text-decoration: none;
  &:hover {
    color: palevioletred;
    text-decoration: underline;
  }
`;
const CustomItem = styled(NavItem)`
  border-radius: 10%;
  margin-right: 10px;
  background-color: #e9e9e98a;
  &:hover {
    background-color: papayawhip;
  }
`;

const BasicNav = (props) => {
  const { activeKey, links } = props;
  return (
    <CustomNav activeKey={activeKey}>
      {links.map((link, index) => {
        const { href, label } = link;
        return (
          <CustomItem>
            <CustomLink href={href}>{label}</CustomLink>
          </CustomItem>
        );
      })}
    </CustomNav>
  );
};
export default BasicNav;
