import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "40px" : "30px")};
  height: ${(props) => (props.lg ? "40px" : "30px")};
  width: ${(props) => (props.xl ? "200px" : "30px")};
  height: ${(props) => (props.xl ? "200px" : "30px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", lg = false, xl = false }) {
  return (
    <SAvatar xl={xl} lg={lg}>
      {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
  );
}

export default Avatar;
