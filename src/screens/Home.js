import { gql, useQuery } from "@apollo/client";
import { faHeartbeat, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { BaseBox, FatText } from "../components/shared";
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
  border: 1.3px solid ${(props) => props.theme.borderColor};
  max-width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Spo2Header = styled.div`
  padding: 15px 15px;
  display: flex;
  align-items: center;
  button {
  }
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const Spo2Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;

const Spo2 = styled.span`
  margin-bottom: 10px;
  font-weight: 600;
`;

const TopContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const TopContent = styled(BaseBox)`
  margin-right: 30px;
  height: 100px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &:last-child {
    margin-right: 0px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Spo2GraphContainer = styled(BaseBox)`
  margin-bottom: 25px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 15px 0px;
`;

const TopContentTitle = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-weight: 600;
    font-size: 16px;
  }
`;

const TopContentValue = styled.div`
  margin-top: 13px;
  font-size: 24px;
  font-weight: 500;
`;

const DivTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  margin: 30px;
`;

function Home() {
  const { data } = useQuery(SPO2_QUERY);
  let health = "";
  let avgSpo2 = 0;
  try {
    avgSpo2 = data?.seeSpo2[0].avgSpo2;
    if (avgSpo2 < 90) {
      health = "Bad";
    } else if (avgSpo2 < 96) {
      health = "Good";
    } else if (avgSpo2 >= 96) {
      health = "Very Good";
    } else if (avgSpo2 === null || avgSpo2 === "unsigned") {
      health = "null";
    }
  } catch (e) {
    avgSpo2 = 0;
    health = "";
  }

  return (
    <div>
      <TopContentContainer>
        <TopContent>
          <TopContentTitle>
            <FontAwesomeIcon icon={faHeartbeat} size="2x" color="red" />
            <span>최근 SpO2 평균</span>
          </TopContentTitle>
          <TopContentValue>{avgSpo2}%</TopContentValue>
        </TopContent>
        <TopContent>
          <TopContentTitle>
            <FontAwesomeIcon icon={faRunning} size="2x" color="blue" />
            <span>건강 상태</span>
          </TopContentTitle>
          <TopContentValue>{health}</TopContentValue>
        </TopContent>
        <TopContent>
          <TopContentTitle>혈압</TopContentTitle>
        </TopContent>
        <TopContent>
          <TopContentTitle>혈압상태</TopContentTitle>
        </TopContent>
      </TopContentContainer>
      <Spo2GraphContainer>
        <Spo2Chart />
      </Spo2GraphContainer>
      <DivTitle>최근 SpO2 측정값</DivTitle>
      {data?.seeSpo2?.map((spo2) => (
        <Spo2Container key={spo2.id}>
          <Spo2Header>
            <Link to={`/users/${spo2.user.username}`}>
              <Avatar lg url={spo2.user.avatar} />
            </Link>
            <Link to={`/users/${spo2.user.username}`}>
              <Username>{spo2.user.username}</Username>
            </Link>
          </Spo2Header>
          <Spo2Data>
            <Spo2>Max SpO2 : {spo2.maxSpo2}%</Spo2>
            <Spo2>Min SpO2 : {spo2.minSpo2}%</Spo2>
            <Spo2>Avg SpO2 : {spo2.avgSpo2}%</Spo2>
          </Spo2Data>
        </Spo2Container>
      ))}
    </div>
  );
}
export default Home;
