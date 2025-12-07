import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [image, setImage] = useState();

  const [updateProduct, setUpdateProduct] = useState({
    p_id: null,
    p_name: "",
    p_desc: "",
    p_brand: "",
    price: "",
    category: "",
    date: "",
    available: false,
    quantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-backend-springboot-1.onrender.com/api/product/${id}`
        );
        const p = response.data;

        // MAP BACKEND → FRONTEND STATE
        const mapped = {
          p_id: p.p_id,
          p_name: p.p_name,
          p_desc: p.p_desc,
          p_brand: p.p_brand,
          price: p.price,
          category: p.category,
          date: p.date, // backend date already in dd-MM-yyyy
          available: p.available,
          quantity: p.quantity,
          imageName: p.imageName
        };

        setProduct(mapped);
        setUpdateProduct(mapped);

        // fetch image
        const imageResponse = await axios.get(
          `https://ecommerce-backend-springboot-1.onrender.com/api/product/${id}/image`,
          { responseType: "blob" }
        );

        const file = new File(
          [imageResponse.data],
          p.imageName,
          { type: imageResponse.data.type }
        );

        setImage(file);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imageFile", image);

    // SEND CORRECT BACKEND FIELD NAMES
    formData.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], {
        type: "application/json",
      })
    );

    try {
      await axios.put(
        `https://ecommerce-backend-springboot-1.onrender.com/api/product/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
      <div className="center-container">
        <h1>Update Product</h1>

        <form className="row g-3 pt-5" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.p_name}
              value={updateProduct.p_name}
              name="p_name"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.p_brand}
              value={updateProduct.p_brand}
              name="p_brand"
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.p_desc}
              value={updateProduct.p_desc}
              name="p_desc"
              onChange={handleChange}
            />
          </div>

          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={product.price}
              value={updateProduct.price}
              name="price"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={updateProduct.category}
              name="category"
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder={product.quantity}
              value={updateProduct.quantity}
              name="quantity"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>

            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt={product.imageName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
              }}
            />

            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={updateProduct.available}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    available: e.target.checked,
                  })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
