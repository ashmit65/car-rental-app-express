const Testimonial = require("../../models/Testimonial");

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
    const data = await Testimonial.find().sort({ _id: -1 });
    // Normalize pic paths for old data
    data.forEach(item => {
      if (item.pic) {
        item.pic = normalizePicPath(item.pic);
      }
    });
    res.render("admin/testimonial/index", {
      session: req.session,
      title: "Admin Testimonial Section",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

function create(req, res) {
  res.render("admin/testimonial/create", {
    session: req.session,
    title: "Admin Testimonial Section",
    data: {},
    error: {},
  });
}

async function store(req, res) {
  try {
    var data;
    data = new Testimonial(req.body);
    if(req.file) {
      // Save web-accessible path (without leading "public/")
      data.pic = `uploads/testimonials/${req.file.filename}`;
    }
        await data.save();
        res.redirect("/admin/testimonial");
  } catch (error) {
    console.log(error);
    errorMessage = {};
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.message
      ? (errorMessage["message"] = error.errors?.message.message)
      : "";
    error.errors?.pic
      ? (errorMessage["pic"] = error.errors?.pic.message)
      : "";
    res.render("admin/testimonial/create", {
      errorMessage: errorMessage,
      data: data,
    });
  }
}

async function edit(req, res) {
  try {
    const data = await Testimonial.findOne({ _id: req.params._id }).sort({ _id: -1 });
    // Normalize pic path for old data
    if (data && data.pic) {
      data.pic = normalizePicPath(data.pic);
    }
    res.render("admin/testimonial/edit", {
      session: req.session,
      title: "Admin Testimonial Section",
      data: data,
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/testimonial");
  }
}

async function update(req, res) {
  let data;
  try {
    // Load existing Testimonial by id
    data = await Testimonial.findById(req.params._id);
    if(req.file) {
      try{
        const fs = require("fs")
        fs.unlinkSync(data.pic)
      }catch (error){ }
      data.pic = req.file.path
    }

    // Update basic fields
    data.name = req.body.name;
    data.message = req.body.message;
    data.active = req.body.active === "true";

    // If a new file is uploaded, update the pic path
    if (req.file) {
      data.pic = `uploads/testimonials/${req.file.filename}`;
    }

    await data.save();
    return res.redirect("/admin/testimonial");
  } catch (error) {
    console.log(error);
    errorMessage = {};
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.message
      ? (errorMessage["message"] = error.errors?.message.message)
      : "";
    error.errors?.pic
      ? (errorMessage["pic"] = error.errors?.pic.message)
      : "";
    res.render("admin/testimonial/edit", {
      session: req.session,
      title: "Admin Testimonial Section",
      errorMessage: errorMessage,
      data: data,
    });
  }
}

async function remove(req, res) {
  try {
    const data = await Testimonial.findOne({ _id: req.params._id }).sort({ _id: -1 });
    await data.deleteOne();
    res.redirect("/admin/testimonial");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/testimonial");
  }
}

module.exports = { home, create, store, remove, edit, update };
