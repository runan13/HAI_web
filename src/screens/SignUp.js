import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Accout created. Please Log in",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            HAI를 정상적으로 이용하시기 위해 새로운 계정을 생성하여 주세요.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "First Name is Required",
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <Input
            ref={register({
              required: "Username is Required",
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            ref={register({
              required: "Email is Required",
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            ref={register({
              required: "Password is Required",
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading.." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta="이미 계정이 있다면?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SignUp;
