import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      email
      avatar
      totalFollowing
      totalFollowers
      isFollowing
      isMe
    }
  }
`;

const EDITPROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $bio: String
    $username: String
    $email: String
    $password: String
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

function EditProfile() {
  const { username } = useParams();
  const { data: userProfile } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const onCompleted = (data) => {
    const {
      editProfile: { ok },
    } = data;
    if (!ok) {
      return;
    } else {
      window.location.assign("http://localhost:3000/");
    }
  };
  const [editProfile, { loading }] = useMutation(EDITPROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    if (data.firstName === "") {
      data.firstName = userProfile?.seeProfile?.firstName;
    }
    if (data.lastName === "") {
      data.lastName = userProfile?.seeProfile?.lastName;
    }
    if (data.bio === "") {
      data.bio = userProfile?.seeProfile?.bio;
    }
    if (data.email === "") {
      data.email = userProfile?.seeProfile?.email;
    }
    editProfile({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Edit Profile" />
      <HeaderContainer>
        <Subtitle>변경하실 내용을 입력하세요.</Subtitle>
        <Subtitle>
          프로필 변경을 완료하기 전까지 로그아웃이 비활성화 됩니다.
        </Subtitle>
      </HeaderContainer>
      <FormBox border>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register}
            name="firstName"
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors.firstName?.message)}
          />
          <FormError message={errors.firstName?.message} />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <Input ref={register} name="bio" type="text" placeholder="bio" />
          <Input
            ref={register({
              required: "username을 입력해 주세요",
              minLength: {
                value: 5,
                message: "짧은 Username입니다, 5글자 이상 입력해 주세요",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username?.message)}
          />
          <FormError message={errors.username?.message} />
          <Input
            ref={register({})}
            name="email"
            type="email"
            placeholder="Email"
            hasError={Boolean(errors.email?.message)}
          />
          <FormError message={errors.email?.message} />
          <Input
            ref={register({
              required: "Password를 입력해 주세요",
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors.password?.message)}
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading.." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </AuthLayout>
  );
}
export default EditProfile;
