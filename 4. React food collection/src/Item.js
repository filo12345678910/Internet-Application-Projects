import React from 'react';

const Item = ({ item, onDelete, onRateChangePlus, onRateChangeMinus }) => {
  return (
    <div className="item">
      <img src={item.image} alt={item.name} />
      <div class = "cont">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Rating: {item.rating}</p>
        <button onClick={() => onRateChangePlus(item.id)}>Change Rating +</button>
        <button onClick={() => onRateChangeMinus(item.id)}>Change Rating -</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Item;