import { Container, Title, Space, Divider } from "@mantine/core";
import { Link } from "react-router-dom";

import Products from "../Products";
import Header from "../Header";

function Home() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center">Welcome To My Store</Title>
        <Header />
        {/* <Link to="cart">Cart</Link> */}
        <Space h="30px" />
        <Divider />
        <Products />
      </Container>
    </div>
  );
}

export default Home;
