import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
