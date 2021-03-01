import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeartbeat, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

function Header() {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <HeaderLogo />
        </Column>
        <Column>
          <Icon>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faHeartbeat} size="2x" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Icon>
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
