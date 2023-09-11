import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProduct, fetchProducts } from "../api";

function Products() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("");

  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  const memoryProducts = queryClient.getQueryData(["products", ""]);
  const categoryOptions = useMemo(() => {
    let options = [];
    if (memoryProducts && memoryProducts.length > 0) {
      memoryProducts.forEach((product) => {
        if (!options.includes(product.category)) {
          options.push(product.category);
        }
      });
    }
    return options;
  }, [memoryProducts]);

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", category],
      });
      notifications.show({
        title: "Product Deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Space h="30px" />
      <Group position="apart">
        <Title order={3} align="center">
          Products
        </Title>
        <Button component={Link} to="/product_add" color="green">
          Add New
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="">All Categories</option>
          {categoryOptions.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </Group>
      <Space h="20px" />
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {products
          ? products.map((product) => {
              return (
                <Grid.Col key={product._id} xs={12} sm={6} lg={4}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{product.name}</Title>
                    <Space h="20px" />
                    <Group position="apart" spacing="5px">
                      <Badge color="yellow">{product.price}</Badge>
                      <Badge color="grape">{product.category}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Button fullWidth color="blue" size="xs">
                      Add To Cart
                    </Button>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/products/" + product._id}
                        color="blue"
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(product._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Products;
