import { gql, useMutation } from "@apollo/client";
import {
  faHeartbeat,
  faRunning,
  faTint,
  faProcedures,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import styled from "styled-components";
import Button from "../components/auth/Button";
import { BaseBox, DivTitle } from "../components/shared";
import Iframe from "react-iframe";

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
      avgSpo2_Sort
      bpUp
      bpDown
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

const Spo2Span = styled.span`
  font-size: 17px;
  margin-top: 25px;
  font-weight: 600;
`;

function SpO2() {
  const { username } = useParams();
  let ok = false;
  let health = "";
  let avgSpo2 = 0;
  let bpStatus = "";
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

  function arrayAverage(arr) {
    var sum = 0;
    for (var i in arr) {
      sum += arr[i];
    }
    var numbersCnt = arr?.length;
    return sum / numbersCnt;
  }
  const bpUP = Math.ceil(arrayAverage(data?.uploadSpo2?.bpUp));
  const bpDOWN = Math.ceil(arrayAverage(data?.uploadSpo2?.bpDown));

  if (bpUP < 120) {
    bpStatus = "저혈압";
  } else if (bpUP < 140) {
    bpStatus = "고혈압 전단계";
  } else if (bpUP < 160) {
    bpStatus = "1기 고혈압";
  } else if (bpUP < 180) {
    bpStatus = "2기 전단계";
  } else if (bpUP < 200) {
    bpStatus = "고혈압 위기";
  }

  return (
    <>
      <SpO2Container>
        <DivTitle>생체 정보 측정</DivTitle>
        <Iframe
          url="http://49.161.233.162:5555/home"
          width="90%"
          height="400px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
        <SpO2Btn onClick={uploadSpo2}>
          {loading ? "측정중..." : "측정 정보 불러오기"}
        </SpO2Btn>
        <Spo2Span>확인 버튼을 누르면 측정이 시작됩니다.</Spo2Span>
        <Spo2Span>측정 중에는 별도의 동작을 하지 말아주세요.</Spo2Span>
        <DivTitle>{loading ? "측정 실패시 현재 화면 새로고침" : ""}</DivTitle>
        {ok ? (
          <>
            <DivTitle>측정 완료</DivTitle>
            <TopContentContainer>
              <TopContent>
                <TopContentTitle>
                  <FontAwesomeIcon icon={faHeartbeat} size="2x" color="red" />
                  <span>측정 SpO2 평균</span>
                </TopContentTitle>
                <TopContentValue>
                  {data?.uploadSpo2?.avgSpo2_Sort}%
                </TopContentValue>
              </TopContent>
              <TopContent>
                <TopContentTitle>
                  <FontAwesomeIcon icon={faRunning} size="2x" color="blue" />
                  <span>건강 상태</span>
                </TopContentTitle>
                <TopContentValue>{health}</TopContentValue>
              </TopContent>
              <TopContent>
                <TopContentTitle>
                  <FontAwesomeIcon icon={faTint} size="2x" color="red" />
                  <span>혈압</span>
                </TopContentTitle>
                <TopContentValue>{bpUP + " / " + bpDOWN}</TopContentValue>
              </TopContent>
              <TopContent>
                <TopContentTitle>
                  <FontAwesomeIcon icon={faProcedures} size="2x" color="blue" />
                  <span>혈압상태</span>
                </TopContentTitle>
                <TopContentValue>{bpStatus}</TopContentValue>
              </TopContent>
            </TopContentContainer>
          </>
        ) : null}
      </SpO2Container>
    </>
  );
}

export default SpO2;
