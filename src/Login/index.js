import {
  Container,
  Title,
  Space,
  Divider,
  TextInput,
  Card,
  Group,
  Button,
} from "@mantine/core";
import Header from "../Header";

export default function Login() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center">Login</Title>
        <Header />
        <Space h="30px" />
        <Card withBorder shadow="md" p="20px">
          <TextInput
            placeholder="Enter the Username here"
            label="Name"
            description="The username"
          />
          <Space h="20px" />
          <Divider />
          <Space h="20px" />
          <TextInput
            placeholder="Enter the Password here"
            label="Password"
            description="Password"
          />
        </Card>
        <Space h="20px" />
        <Group>
          <Button fullWidth>Login</Button>
        </Group>
      </Container>
    </div>
  );
}
