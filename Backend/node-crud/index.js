const cors = require("cors");
const express = require("express");
// const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://priyanshi:Priya123@mongodbcluster.har5u.mongodb.net/crudDb")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));
  const itemSchema = new mongoose.Schema({
    name: String
  });
  
  const Item = mongoose.model("Item", itemSchema);
  const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3000;

// app.get("/items", (req, res) => {
//   const data = JSON.parse(fs.readFileSync("data.json"));
//   res.json(data);
// });

app.get("/items", async (req, res) => {
  const data = await Item.find();
  res.json(data);
});

// app.post("/items", (req, res) => {
//   const data = JSON.parse(fs.readFileSync("data.json"));

//   const newItem = {
//     id: Date.now(),
//     name: req.body.name
//   };

//   data.push(newItem);

//   fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

//   res.json(newItem);
// });

// app.delete("/items/:id", (req, res) => {
//   const data = JSON.parse(fs.readFileSync("data.json"));

//   const filteredData = data.filter(item => item.id != req.params.id);

//   fs.writeFileSync("data.json", JSON.stringify(filteredData, null, 2));

//   res.json({ message: "Item deleted" });
// });

app.post("/items", async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  await newItem.save();
  res.json(newItem);
});
app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});
  
  // app.put("/items/:id", (req, res) => {
  //   const data = JSON.parse(fs.readFileSync("data.json"));
  
  //   const updatedData = data.map(item => {
  //     if (item.id == req.params.id) {
  //       return { ...item, name: req.body.name };
  //     }
  //     return item;
  //   });
  
  //   fs.writeFileSync("data.json", JSON.stringify(updatedData, null, 2));
  
  //   res.json({ message: "Item updated" });
  // });
  app.put("/items/:id", async (req, res) => {
    try {
      const updated = await Item.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server runningg on port ${PORT}`);
  });