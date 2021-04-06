import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  disableOpenEditProfile,
  enableOpenEditProfile,
  logUserOut,
  openEditProfileVar,
} from "../apollo";
import Button from "../components/auth/Button";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { BaseBox, DivTitle } from "../components/shared";
import EditProfile from "./EditProfile";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      totalFollowing
      totalFollowers
      isFollowing
      isMe
    }
  }
`;

const ProfileContainer = styled(BaseBox)`
  max-width: 100%;
  height: 250px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const AvatarColumn = styled.div`
  margin: 0px 80px;
`;

const InfoColumn = styled.div`
  display: flex;
  margin-left: 50px;
  width: 360px;
  flex-direction: column;
`;

const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.span`
  color: darkgray;
  margin-bottom: 3px;
`;

const Value = styled.span`
  font-size: 20px;
`;

const ProFileBtn = styled(Button).attrs({
  as: "button",
})`
  margin-left: 40px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const EditContainer = styled(BaseBox)`
  max-width: 50%;
  height: 580px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
`;

const SDivTitle = styled(DivTitle)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Profile() {
  const { username } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const openEditProfile = useReactiveVar(openEditProfileVar);
  const getButton = (seeProfile) => {
    const { isMe } = seeProfile;
    if (isMe) {
      return (
        <ProFileBtn
          onClick={
            openEditProfile ? disableOpenEditProfile : enableOpenEditProfile
          }
        >
          Edit Profile
        </ProFileBtn>
      );
    }
  };
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading.." : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <SDivTitle>프로필</SDivTitle>
      <ProfileContainer>
        <AvatarColumn>
          <Avatar xl url={data?.seeProfile?.avatar} />
        </AvatarColumn>
        <InfoColumn>
          <InfoTop>
            <Info>
              <Title>Username</Title>
              <Value>{data?.seeProfile?.username}</Value>
            </Info>
            <Info>
              <Title>Full name</Title>
              <Value>
                {data?.seeProfile?.firstName}
                {data?.seeProfile?.lastName}
              </Value>
            </Info>
          </InfoTop>
          <Info>
            <Title>Bio</Title>
            <Value>{data?.seeProfile?.bio}</Value>
          </Info>
          <InfoBottom>
            <Info>
              <Title>Authentication</Title>
              <Value>{data?.seeProfile?.isMe ? "Success" : "Fail"}</Value>
            </Info>
            <ProFileBtn
              disabled={openEditProfile === true}
              onClick={logUserOut}
            >
              log Out
            </ProFileBtn>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </InfoBottom>
        </InfoColumn>
      </ProfileContainer>
      {openEditProfile ? (
        <>
          <SDivTitle>프로필 변경</SDivTitle>
          <EditContainer>
            <EditProfile />
          </EditContainer>
        </>
      ) : null}
    </div>
  );
}

export default Profile;
