import { Group, Space } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Space h="20px" />
      <Group position="apart">
        <Link to="/">Home</Link>
        <Link to="/Cart">Cart</Link>
        <Link to="">My Orders</Link>
      </Group>
    </div>
  );
}
