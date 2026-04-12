const cors = require("cors");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3000;

app.get("/items", (req, res) => {
    const data = JSON.parse(fs.readFileSync("data.json"));
    res.json(data);
  });

  app.post("/items", (req, res) => {
    const data = JSON.parse(fs.readFileSync("data.json"));
  
    const newItem = {
      id: Date.now(),
      name: req.body.name
    };
  
    data.push(newItem);
  
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  
    res.json(newItem);
  });

  app.delete("/items/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync("data.json"));
  
    const filteredData = data.filter(item => item.id != req.params.id);
  
    fs.writeFileSync("data.json", JSON.stringify(filteredData, null, 2));
  
    res.json({ message: "Item deleted" });
  });
  
  app.put("/items/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync("data.json"));
  
    const updatedData = data.map(item => {
      if (item.id == req.params.id) {
        return { ...item, name: req.body.name };
      }
      return item;
    });
  
    fs.writeFileSync("data.json", JSON.stringify(updatedData, null, 2));
  
    res.json({ message: "Item updated" });
  });

  app.listen(PORT, () => {
    console.log(`Server runningg on port ${PORT}`);
  });