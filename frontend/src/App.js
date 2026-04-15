import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editValues, setEditValues] = useState({});

  const addItem = () => {
    fetch("http://localhost:3000/items", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(newItem => {
        setItems([...items, newItem]);
        setName("");
      });
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE"
    }).then(() => {
      setItems(items.filter(item => item.id !== id));
    });
    window.location.reload()
  };
  const handleChange = (id, value) => {
    setEditValues({ ...editValues, [id]: value });
  };

  console.log("sss",editValues)

  const updateItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: editValues[id] })
    })
      .then(() => {
        const updated = items.map(item =>
          item.id === id
            ? { ...item, name: editValues[id] }
            : item
        );
        setItems(updated);
      });
      window.location.reload()

  };
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);
  return (
    <div>
      <h1>Itemss List</h1>
      {items.map(item => (
  <div key={item.id} >
    <span style={{marginRight:10, marginTop:10}}>{item.name}</span>
    <button style={{marginRight:10, marginTop:10}} onClick={() => deleteItem(item._id)}>Delete</button>
    <input style={{marginRight:10, marginTop:10}}
            placeholder="Enter new name"
            onChange={(e) => handleChange(item._id, e.target.value)}
          />
            <button onClick={() => updateItem(item._id)}>
            Update
          </button>
  </div>
))}

<input 
style={{marginRight:10, marginTop:30}}
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
<button onClick={addItem}>Add</button>
    </div>
  );
}

export default App;