import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { BaseBox } from "../components/shared";

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

function SpO2() {
  const { username } = useParams();
  console.log(username);
  const onCompleted = (data) => {
    const {
      uploadSpo2: { id },
    } = data;
    if (!id) {
      return;
    } else {
      console.log(data);
    }
  };
  const [uploadSpo2, { loading }] = useMutation(UPLOADSPO2_MUTATION, {
    onCompleted,
    variables: {
      username,
    },
  });
  return (
    <>
      <button onClick={uploadSpo2}>test</button>
      {loading ? "Loading.." : "Done !"}
    </>
  );
}

export default SpO2;
