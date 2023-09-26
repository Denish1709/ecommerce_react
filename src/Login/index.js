import { Container, Title, Space, Divider } from "@mantine/core";
import Header from "../Header";

export default function Login() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center">Login</Title>
        <Header />
        <Space h="30px" />
      </Container>
    </div>
  );
}
