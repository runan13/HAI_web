import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
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

function Profile() {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  console.log(data);
  return "Profile";
}

export default Profile;
