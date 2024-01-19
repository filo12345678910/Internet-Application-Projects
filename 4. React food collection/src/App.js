import React, { useState } from 'react';
import Item from './Item';
import itemsData from './items.json';
import AddItemForm from './AddItemForm';

const App = () => {
  const [items, setItems] = useState(itemsData);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleRateChangePlus = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, rating: Math.min(item.rating + 1, 5)};
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRateChangeMinus = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, rating: Math.max(item.rating - 1, 0)};
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleAddItem = (newItem) => {
    const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const newId = maxId + 1;
    const newItemWithId = { ...newItem, id: newId };
    setItems([...items, newItemWithId]);
  };

  const handleSortByName = () => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setItems(sortedItems);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchedItemIndex = items.findIndex(
      (item) => item.name.toLowerCase().includes(lowerCaseQuery)
    );

    if (matchedItemIndex !== -1) {
      const matchedItem = items[matchedItemIndex];
      const updatedItems = [
        matchedItem,
        ...items.slice(0, matchedItemIndex),
        ...items.slice(matchedItemIndex + 1),
      ];

      setItems(updatedItems);
    }
  };

  return (
    <div className="App">
      <h1>Food Collection</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <button onClick={handleSortByName}>Sort by Name ({sortOrder === 'asc' ? 'asc' : 'desc'})</button>
      <div>
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onRateChangePlus={handleRateChangePlus}
          onRateChangeMinus={handleRateChangeMinus}
        />
      ))}
    </div>
  );
};

export default App;