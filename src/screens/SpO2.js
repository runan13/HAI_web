import { useParams } from "react-router";

function SpO2() {
  const { username } = useParams();
  return "SpO2";
}

export default SpO2;
