export default function ProductForm({
  productName,
  id,
  brand,
  quantity,
  image,
  price,
  handleOnSubmit,
  handleOnChange,
  isEditing,
}) {
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="id">Product ID: </label>
        <input
          type="text"
          name="id"
          id="id"
          value={id}
          onChange={handleOnChange}
          placeholder="Enter product id"
          required
        />
        <br />
        <label htmlFor="productName">Product Name: </label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={handleOnChange}
          placeholder="Enter product name"
          required
        />
        <br />
        <label htmlFor="brand">Brand: </label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          onChange={handleOnChange}
          placeholder="Enter brand"
          required
        />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={handleOnChange}
          placeholder="Enter quantity"
          required
        />
        <br />
        <label htmlFor="image">Image URL: </label>
        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={handleOnChange}
          placeholder="Enter image URL"
          required
        />
        <br />
        <label htmlFor="price">Price: </label>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Enter price (e.g. $3.50)"
          required
        />
        <br />
        <button>{isEditing ? "Editing" : "Submit"}</button>
      </form>
    </div>
  );
}
