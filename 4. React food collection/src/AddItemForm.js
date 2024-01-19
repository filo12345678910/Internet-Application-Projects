import React, { useState } from 'react';

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    image: "images\\placeholder.png",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem({
      name: "",
      description: "",
      image: "images\\placeholder.png",
      rating: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={newItem.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={newItem.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" name="image" value={newItem.image} onChange={handleChange} />
      </label>
      <br />
      <label>
        Rating:
        <input type="number" name="rating" value={newItem.rating} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;