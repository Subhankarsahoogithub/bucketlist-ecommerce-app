import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    //fetch the name of the category:
    const { name } = req.body;
    //no name:
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    //check if category already exist:
    const existingCategory = await categoryModel.findOne({ name });
    //exist:
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    //not exist: create a new category:
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    //return response:
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

// //update category
export const updateCategoryController = async (req, res) => {
  try {
    //fetch the name and id of the category:
    const { name } = req.body;
    const { id } = req.params;
    //find it on database: and update:
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) }, //remove the spaces:
      { new: true }
    );
    //send the response:
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    //find all the rows:
    const category = await categoryModel.find({});
    //send the response:
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    //fetch the id from params and find the row in db:
    const category = await categoryModel.findOne({ slug: req.params.slug });
    //send the response:
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    //fetch the id from params:
    const { id } = req.params;
    //find it in db and delete:
    await categoryModel.findByIdAndDelete(id);
    //send the response:
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
