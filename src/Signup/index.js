import {
  Container,
  Title,
  Space,
  Divider,
  TextInput,
  Card,
  Button,
  Group,
} from "@mantine/core";
import Header from "../Header";

export default function Signup() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center">Sign Up</Title>
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
            placeholder="Enter the Email here"
            label="Email"
            description="Email"
          />
          <Space h="20px" />
          <Divider />
          <Space h="20px" />
          <TextInput
            placeholder="Enter the Password here"
            label="Password"
            description="Password"
          />
          <Space h="20px" />
          <Divider />
          <Space h="20px" />
          <TextInput
            placeholder="Confirm your password here"
            label="Confirm Password"
            description="Confirm Password"
          />
        </Card>
        <Space h="20px" />
        <Group>
          <Button fullWidth>Register</Button>
        </Group>
      </Container>
    </div>
  );
}
