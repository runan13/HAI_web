import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import Spo2Chart from "../components/Spo2Chart";

const SPO2_QUERY = gql`
  query seeSpo2 {
    seeSpo2 {
      id
      user {
        username
        avatar
      }
      minSpo2
      avgSpo2
      maxSpo2
      createdAt
      isMine
    }
  }
`;

const Spo2Container = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Spo2Header = styled.div`
  padding: 15px 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const Spo2Graph = styled.div`
  width: 700px;
`;

function Home() {
  const { data } = useQuery(SPO2_QUERY);
  return (
    <div>
      {data?.seeSpo2?.map((spo2) => (
        <Spo2Container key={spo2.id}>
          <Spo2Header>
            <Avatar lg url={spo2.user.avatar} />
            <Username>{spo2.user.username}</Username>
          </Spo2Header>
          <Spo2Graph>
            <Spo2Chart spo2={spo2.maxSpo2} />
          </Spo2Graph>
        </Spo2Container>
      ))}
    </div>
  );
}
export default Home;
