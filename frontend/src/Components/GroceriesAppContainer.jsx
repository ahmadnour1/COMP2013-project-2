import { useState, useEffect } from "react";
import axios from "axios";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer({ products }) {
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //useEffect
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  //GET Data from DB handler
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductQuantity(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
        setIsEditing(false);
        setFormData({
          id: "",
          productName: "",
          brand: "",
          quantity: "",
          image: "",
          price: "",
        });
      } else {
        await axios
          .post("http://localhost:3000/products", formData)
          .then((response) => {
            setPostResponse(response.data.message);
            console.log(response);
          })
          .then(() =>
            setFormData({
              id: "",
              productName: "",
              brand: "",
              quantity: "",
              image: "",
              price: "",
            })
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle to delete on product by id
  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      setPostResponse(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the edition of one product by its id
  const handleOnEdit = async (id) => {
    try {
      const productToEdit = await axios.get(
        `http://localhost:3000/products/${id}`
      );
      console.log(productToEdit);

      setFormData({
        id: productToEdit.data.id,
        productName: productToEdit.data.productName,
        brand: productToEdit.data.brand,
        quantity: productToEdit.data.quantity || 0, //becaause products don't have quantity, we put 0
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        _id: productToEdit.data._id,
      });

      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnUpdate = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = productQuantity.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <ProductForm
          id={formData.id}
          productName={formData.productName}
          brand={formData.brand}
          quantity={formData.quantity}
          image={formData.image}
          price={formData.price}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          isEditing={isEditing}
        />
        <ProductsContainer
          products={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
          productQuantity={productQuantity}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
