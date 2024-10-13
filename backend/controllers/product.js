const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  if (req.user.role === "admin") {
    req.body.branch = req.user.branch;
  }
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProduct = async (req, res) => {
  let products;
  if (req.user.role === "superadmin") {
    products = await Product.find({});
  }
  if (req.user.role === "admin") {
    let { branch } = req.user;
    products = await Product.find({ branch });
  }
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`no product found with ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product found with ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product found with ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Product removed sucessfully" });
};

const deleteAllProduct = async (req, res) => {
  await Product.deleteMany({});
  res.status(StatusCodes.OK).json({ msg: "All products Deleated" });
};

const checkProductQuantity = async (req, res) => {
  try {
    const { userId } = req.user;
    const { category } = req.params;
    let product = await Product.find({
      productType: category,
      createdBy: userId,
      tag: "notassigned",
    });

    if (product.length <= 0) {
      return res
        .status(StatusCodes.OK)
        .json({ stock: false, count: product.length, product: product });
    }

    product = product.map((pro) => {
      return {
        label: pro?.accessoriesName,
        value: pro?._id,
      };
    });

    return res
      .status(StatusCodes.OK)
      .json({ stock: true, count: product.length, product: product });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
  checkProductQuantity,
};
