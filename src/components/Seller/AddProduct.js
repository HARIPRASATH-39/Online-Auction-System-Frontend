import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import axios from "axios";
import "./AddProduct.css"; // Custom CSS for AddProduct

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const token = sessionStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8081/auction/category/getAllCategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories. Please try again.");
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object for product data
    const productData = {
      productName,
      price,
      category: {
        categoryName: category,
      },
    };

    // Create FormData object
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    ); // Append product data as JSON
    formData.append("image", image); // Append the image file

    try {
      const response = await axios.post(
        `http://localhost:8081/auction/product/add/user/${userId}`,
        formData, // Send FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added:", response.data);
      toast.success("Product added successfully!"); // Show success toast
      navigate("/"); // Redirect to the seller dashboard
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        toast.error(error.response.data); // Show error toast
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again."); // Show error toast
      }
    }
  };

  return (
    <div className="add-product-container">
      {/* Toast Container */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
      />

      <h2 className="add-product-title">Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select the Category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.categoryName}
                className="options"
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
            required
          />
        </div>

        {preview && (
          <div className="form-group">
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        )}

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
