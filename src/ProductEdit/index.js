import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateProduct, getProduct } from "../api";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    onSuccess: (data) => {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category);
    },
  });

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies/" + id
  //     )
  //     .then((response) => {
  //       // set value for every fields
  //       setTitle(response.data.title);
  //       setDirector(response.data.director);
  //       setReleaseYear(response.data.release_year);
  //       setGenre(response.data.genre);
  //       setRating(response.data.rating);
  //     })
  //     .catch((error) => {
  //       notifications.show({
  //         title: error.response.data.message,
  //         color: "red"
  //       });
  //     });
  // }, []);

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // show add success message
      notifications.show({
        title: "Product Edited",
        color: "green",
      });
      // redirect back to home page
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
      }),
    });
    // try {
    //   await axios({
    //     method: "PUT",
    //     url:
    //       "https://curly-tribble-vg976vg6pp3j5p-5000.app.github.dev/movies/" +
    //       id,
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     data: JSON.stringify({
    //       title: title,
    //       director: director,
    //       release_year: releaseYear,
    //       genre: genre,
    //       rating: rating
    //     })
    //   });
    //   // show add success message
    //   notifications.show({
    //     title: "Movie Edited",
    //     color: "green"
    //   });
    //   // redirect back to home page
    //   navigate("/");
    // } catch (error) {
    //   notifications.show({
    //     title: error.response.data.message,
    //     color: "red"
    //   });
    // }
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Product
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <LoadingOverlay visible={isLoading} />
        <TextInput
          value={name}
          placeholder="Enter the product name here"
          label="Name"
          description="The name of the Product"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={description}
          placeholder="Enter the product description here"
          label="Description"
          description="The description of the product"
          withAsterisk
          onChange={(event) => setDescription(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={price}
          placeholder="Enter the price here"
          label="Price"
          description="The price of the product"
          withAsterisk
          precision={2}
          onChange={setPrice}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category here"
          label="Category"
          description="The category of the product"
          withAsterisk
          onChange={(event) => setCategory(event.target.value)}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleUpdateProduct}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default ProductEdit;
