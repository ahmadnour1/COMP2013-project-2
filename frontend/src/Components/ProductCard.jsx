export default function ProductCard({
  _id,
  productName,
  brand,
  quantity,
  image,
  price,
  handleOnDelete,
  handleOnEdit,
  handleAddToCart,
}) {
  return (
    <div>
      <h3>{productName}</h3>

      {image ? <img src={image} alt="" width="fit" /> : null}

      <p>{brand}</p>
      <p>{quantity}</p>
      <p>{price}</p>

      <button onClick={() => handleAddToCart(_id)}>Add to Cart</button>
      <button onClick={() => handleOnDelete(_id)}>Delete</button>
      <button onClick={() => handleOnEdit(_id)}>Edit</button>

      <hr />
    </div>
  );
}
