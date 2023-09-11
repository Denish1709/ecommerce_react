import { Container, Title, Space, Divider } from "@mantine/core";

import Products from "../Products";

function Home() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center">Welcome To My Store</Title>
        <Space h="30px" />
        <Divider />
        <Products />
      </Container>
    </div>
  );
}

export default Home;
