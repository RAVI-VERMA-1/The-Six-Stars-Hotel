import styled from "styled-components";

const StyledLogo = styled.div`
  /* text-align: center; */
  font-size: 20px;
  font-weight: 600;
  color: var(--color-blue-700);
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      The Six Star Hotel🏨{/* <Img src="/logo-light.png" alt="Logo" /> */}
    </StyledLogo>
  );
}

export default Logo;
