import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCartItems } from "../api/cart";
import { Container, Title, Table, Group, Button, Image } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import Header from "../Header";
import { Link } from "react-router-dom";

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  // console.log(queryClient.getQueryData(["cart"]));
  //   console.log(getCartItems());
  // console.log(cart);

  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const checkBoxAll = (event) => {
    if (event.target.checked) {
      const newCheckedList = [];
      cart.forEach((cart) => {
        newCheckedList.push(cart._id);
      });
      setCheckedList(newCheckedList);
      setCheckAll(true);
    } else {
      setCheckedList([]);
      setCheckAll(false);
    }
  };
  const checkboxOne = (event, id) => {
    if (event.target.checked) {
      const newCheckedList = [...checkedList];
      newCheckedList.push(id);
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((cart) => cart !== id);
      setCheckedList(newCheckedList);
    }
  };
  const calculateTotal = () => {
    let total = 0;
    cart.map((item) => (total = total + item.quantity * item.price));
    return total;
  };

  return (
    <Container>
      <Header />
      <Title align="center">cart</Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                type="checkbox"
                checked={checkAll}
                disabled={cart && cart.length > 0 ? false : true}
                onChange={(event) => {
                  checkBoxAll(event);
                }}
              />
            </th>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>
              <Group position="right">Action</Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {cart ? (
            cart.map((c) => {
              return (
                <tr key={c._id}>
                  <td>
                    <Checkbox
                      checked={
                        checkedList && checkedList.includes(c._id)
                          ? true
                          : false
                      }
                      type="checkbox"
                      onChange={(event) => {
                        checkboxOne(event, c._id);
                      }}
                    />
                  </td>
                  <td>
                    {c.image && c.image !== "" ? (
                      <>
                        <Image
                          src={"http://localhost:5000/" + c.image}
                          width="10vw"
                          height="10vh"
                        />
                      </>
                    ) : (
                      <Image
                        src="https://media.licdn.com/dms/image/C5103AQEyQErA-88x9g/profile-displayphoto-shrink_800_800/0/1573876173762?e=2147483647&v=beta&t=BsskLzQGl8CfpKoSsPiuAEoQDZW_N4OmOx0zJC9kGTY"
                        width="10vw"
                        height="8vh"
                      />
                    )}
                  </td>
                  <td> {c.name}</td>
                  <td>${c.price}</td>
                  <td>{c.quantity}</td>
                  <td>${c.price * c.quantity}</td>
                  <td>
                    <Group position="right">
                      <Button color="red" size="xs" radius="5px">
                        Remove
                      </Button>
                    </Group>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>No Product Add Yet!</td>
            </tr>
          )}
          <tr>
            <td colSpan={5} className="text-end me-5"></td>
            <td>${calculateTotal()}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Group>
        <Button component={Link} to={""} color="red" size="md">
          Delete
        </Button>
      </Group>
    </Container>
  );
}
