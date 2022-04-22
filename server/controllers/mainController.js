require("../models/db");
const Category = require("../models/Category");
const Info = require("../models/Info");

// Home Controller
exports.homepage = async (req, res) => {
  try {
    const limitnum = 5;
    const categories = await Category.find({}).limit(limitnum);
    const latest = await Info.find({}).sort({ _id: -1 }).limit(limitnum);
    const one = await Info.find({ category: "1" }).limit(limitnum);
    const two = await Info.find({ category: "2" }).limit(limitnum);
    const three = await Info.find({ category: "3" }).limit(limitnum);
    const four = await Info.find({ category: "4" }).limit(limitnum);
    const five = await Info.find({ category: "5" }).limit(limitnum);
    const info = { latest, one, two, three, four, five };
    res.render("index", { title: "Home", categories, info });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Category Controller
exports.allCategories = async (req, res) => {
  try {
    // const limitnum = 20;
    // const categories = await Category.find({}).limit(limitnum);
    const categories = await Category.find({});
    res.render("categories", { title: "Home", categories });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

exports.Category = async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await Category.find({ category: id });
    res.render("categories", { title: categories.name, categories });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Info Controller
exports.info = async (req, res) => {
  try {
    const id = req.params.id;
    const info = await Info.findById(id);
    res.render("info", { title: info.name, info });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};
