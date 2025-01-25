import React, { useState, useEffect } from "react";
import axios from "axios";

const ListAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8081/auction/product/findAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data); // Log the response
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  return (
    <div>
      <h1>List All Products</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.productId}>
            {" "}
            {/* Use product.productId instead of product.id */}
            <p>
              ID: {product.productId}, Name: {product.productName}, Price: ₹
              {product.price}
            </p>
          </div>
        ))
      ) : (
        <p>No products found.</p> // Show a message if the products array is empty
      )}
    </div>
  );
};

export default ListAllProducts;
