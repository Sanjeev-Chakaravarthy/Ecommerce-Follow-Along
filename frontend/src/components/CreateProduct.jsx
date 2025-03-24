import { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Electronics", "Fashion", "Books", "Home Appliances"];

  // Handle image upload
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Remove image from preview
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("price", price);
    formData.append("stock", stock);
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await axios.post("http://localhost:6000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Product created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating product: ", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setImages([]);
    setName("");
    setDescription("");
    setCategory("");
    setTags("");
    setPrice("");
    setStock("");
  };

  return (
    <Container>
      <ToastContainer />
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="4"
          required
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
        />
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          required
        />
        <FileUpload>
          <label htmlFor="upload">
            <AiOutlinePlusCircle size={30} />
            <span>Upload Images</span>
          </label>
          <input
            type="file"
            id="upload"
            multiple
            onChange={handleImagesChange}
            hidden
            required
          />
        </FileUpload>
        <ImagePreview>
          {images.map((img, index) => (
            <ImagePreviewItem key={index}>
              <img src={URL.createObjectURL(img)} alt="Preview" />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                <AiOutlineClose size={15} />
              </button>
            </ImagePreviewItem>
          ))}
        </ImagePreview>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateProduct;

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const FileUpload = styled.div`
  margin: 10px 0;
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #578e7e;
    font-size: 14px;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    &:hover {
      background: rgba(255, 0, 0, 1);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #578e7e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #467968;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;