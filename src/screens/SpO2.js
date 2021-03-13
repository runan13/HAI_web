import { gql, useMutation } from "@apollo/client";
import { faHeartbeat, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import styled from "styled-components";
import Button from "../components/auth/Button";
import { BaseBox, DivTitle } from "../components/shared";

const UPLOADSPO2_MUTATION = gql`
  mutation uploadSpo2($username: String!) {
    uploadSpo2(username: $username) {
      id
      user {
        id
        username
      }
      minSpo2
      avgSpo2
      maxSpo2
      createdAt
      isMine
    }
  }
`;

const SpO2Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SpO2Btn = styled(Button).attrs({
  as: "button",
})`
  max-width: 300px;
  height: 50px;
  cursor: pointer;
`;

const TopContentContainer = styled.div`
  display: flex;
  width: 1000px;
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

function SpO2() {
  const { username } = useParams();
  let ok = false;
  let health = "";
  let avgSpo2 = 0;
  const onCompleted = (data) => {
    const {
      uploadSpo2: { id },
    } = data;
    if (!id) {
      return;
    } else {
    }
  };
  const [uploadSpo2, { data, loading }] = useMutation(UPLOADSPO2_MUTATION, {
    onCompleted,
    variables: {
      username,
    },
  });
  console.log(data);
  if (data !== undefined) {
    ok = true;
  }
  try {
    avgSpo2 = data?.uploadSpo2?.avgSpo2;
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
    <>
      <SpO2Container>
        <SpO2Btn onClick={uploadSpo2}>
          {loading ? "측정중..." : "SpO2 측정"}
        </SpO2Btn>
        <DivTitle>{loading ? "Loading..." : ""}</DivTitle>
        {ok ? (
          <>
            <DivTitle>측정 완료</DivTitle>
            <TopContentContainer>
              <TopContent>
                <TopContentTitle>
                  <FontAwesomeIcon icon={faHeartbeat} size="2x" color="red" />
                  <span>측정 SpO2 평균</span>
                </TopContentTitle>
                <TopContentValue>{data?.uploadSpo2?.avgSpo2}%</TopContentValue>
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
          </>
        ) : null}
      </SpO2Container>
    </>
  );
}

export default SpO2;
