const Car = require("../../models/Car");

// Helper function to normalize pic paths (fixes old data with "public\" prefix)
function normalizePicPath(pic) {
  if (!pic) return pic;
  let path = String(pic);
  // Convert Windows backslashes to URL slashes
  path = path.replace(/\\/g, "/");
  // Remove leading "public/" or "/public/"
  if (path.startsWith("public/")) {
    path = path.substring(7);
  } else if (path.startsWith("/public/")) {
    path = path.substring(8);
  }
  return path;
}

async function home(req, res) {
  try {
    const data = await Car.find().sort({ _id: -1 });
    // Normalize pic paths for old data
    data.forEach(item => {
      if (item.pic) {
        item.pic = normalizePicPath(item.pic);
      }
    });
    res.render("admin/car/index", {
      session: req.session,
      title: "Admin Car Section",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

function create(req, res) {
  res.render("admin/car/create", {
    session: req.session,
    title: "Admin Car Section",
    data: {},
    error: {},
  });
}

async function store(req, res) {
  try {
    var data;
    data = new Car(req.body);
    if(req.file) {
      // Save web-accessible path (without leading "public/")
      data.pic = `uploads/cars/${req.file.filename}`;
    }
        await data.save();
        res.redirect("/admin/car");
  } catch (error) {
    console.log("Error saving car:", error);
    errorMessage = {};
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.rating
      ? (errorMessage["rating"] = error.errors?.rating.message)
      : "";
    error.errors?.rent
      ? (errorMessage["rent"] = error.errors?.rent.message)
      : "";
    error.errors?.seatingCapacity
      ? (errorMessage["seatingCapacity"] = error.errors?.seatingCapacity.message)
      : "";
    error.errors?.mode
      ? (errorMessage["mode"] = error.errors?.mode.message)
      : "";
    error.errors?.fuelType
      ? (errorMessage["fuelType"] = error.errors?.fuelType.message)
      : "";
    error.errors?.pic
      ? (errorMessage["pic"] = error.errors?.pic.message)
      : "";
    res.render("admin/car/create", {
      session: req.session,
      title: "Admin Car Section",
      errorMessage: errorMessage,
      data: req.body,
    });
  }
}

async function edit(req, res) {
  try {
    const data = await Car.findOne({ _id: req.params._id }).sort({ _id: -1 });
    // Normalize pic path for old data
    if (data && data.pic) {
      data.pic = normalizePicPath(data.pic);
    }
    res.render("admin/car/edit", {
      session: req.session,
      title: "Admin Car Section",
      data: data,
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/car");
  }
}

async function update(req, res) {
  let data;
  try {
    // Load existing Car by id
    data = await Car.findById(req.params._id);
    if(req.file) {
      try{
        const fs = require("fs")
        fs.unlinkSync(data.pic)
      }catch (error){ }
      data.pic = req.file.path
    }

    // Update basic fields
    data.name = req.body.name;
    data.rating = req.body.rating;
    data.rent = req.body.rent;
    data.seatingCapacity = req.body.seatingCapacity;
    data.mode = req.body.mode;
    data.fuelType = req.body.fuelType;
    data.active = req.body.active === "true";

    // If a new file is uploaded, update the pic path
    if (req.file) {
      data.pic = `uploads/cars/${req.file.filename}`;
    }

    await data.save();
    return res.redirect("/admin/car");
  } catch (error) {
    console.log(error);
    errorMessage = {};
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.rating
      ? (errorMessage["rating"] = error.errors?.rating.message)
      : "";
    error.errors?.rent
      ? (errorMessage["rent"] = error.errors?.rent.message)
      : "";
    error.errors?.seatingCapacity
      ? (errorMessage["seatingCapacity"] = error.errors?.seatingCapacity.message)
      : "";
    error.errors?.mode
      ? (errorMessage["mode"] = error.errors?.mode.message)
      : "";
    error.errors?.fuelType
      ? (errorMessage["fuelType"] = error.errors?.fuelType.message)
      : "";
    error.errors?.pic
      ? (errorMessage["pic"] = error.errors?.pic.message)
      : "";
    res.render("admin/car/edit", {
      session: req.session,
      title: "Admin Car Section",
      errorMessage: errorMessage,
      data: data,
    });
  }
}

async function remove(req, res) {
  try {
    const data = await Car.findOne({ _id: req.params._id }).sort({ _id: -1 });
    await data.deleteOne();
    res.redirect("/admin/car");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/car");
  }
}

module.exports = { home, create, store, remove, edit, update };
