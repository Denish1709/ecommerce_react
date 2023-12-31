import { useState } from "react";
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
  Image,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { addProduct, uploadProductImage } from "../api/api";

function ProductAdd() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // create mutation
  const createMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      notifications.show({
        title: "New Product Added",
        color: "green",
      });
      navigate("/");
    },
    onError: (error) => {
      // when this is an error in API call
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddNewPrdouct = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutation = useMutation({
    mutationFn: uploadProductImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleImageUpload = (files) => {
    uploadMutation.mutate(files[0]);
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Add New Product
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the product name here"
          label="Name"
          description="The name of the product"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={description}
          placeholder="Enter the description here"
          label="Description"
          description="The description for the product"
          withAsterisk
          onChange={(event) => setDescription(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        {image !== "" ? (
          <>
            <Image
              src={
                "https://musical-space-halibut-vg976vgvqrc69x-5000.app.github.dev/" +
                image
              }
              width="100%"
            />
            <Button color="dark" mt="15px" onClick={() => setImage("")}>
              Remove Image
            </Button>
          </>
        ) : (
          <Dropzone
            multiple={false}
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => {
              handleImageUpload(files);
            }}
          >
            <Title order={4} align="center" py="20px">
              Click to upload or Drag image to upload
            </Title>
          </Dropzone>
        )}
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={price}
          placeholder="Enter the price here"
          label="Price(USD)"
          precision={2}
          description="What is a price"
          withAsterisk
          onChange={setPrice}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category at here"
          label="Category"
          description="What is the category for this"
          withAsterisk
          onChange={(event) => setCategory(event.target.value)}
        />

        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewPrdouct}>
          Add New
        </Button>
      </Card>
      <Space h="50px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="50px" />
    </Container>
  );
}
export default ProductAdd;
