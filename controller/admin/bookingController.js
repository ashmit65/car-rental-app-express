const Booking = require("../../models/Booking");

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
    const data = await Booking.find().sort({ _id: -1 });
    // Normalize pic paths for old data
    data.forEach(item => {
      if (item.pic) {
        item.pic = normalizePicPath(item.pic);
      }
    });
    res.render("admin/booking/index", {
      session: req.session,
      title: "Admin Booking Section",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}


async function edit(req, res) {
  try {
    const data = await Booking.findOne({ _id: req.params._id }).sort({ _id: -1 });
    data.active = false;
    await data.save();
    res.render("admin/booking/show", {
      session: req.session,
      title: "Admin Booking Section",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/booking");
  }
}

async function show(req, res) {
  try {
    const data = await Booking.findOne({ _id: req.params._id }).sort({ _id: -1 });
    // Normalize pic path for old data
    if (data && data.pic) {
      data.pic = normalizePicPath(data.pic);
    }
    res.render("admin/booking/show", {
      session: req.session,
      title: "Admin Booking Section",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/booking");
  }
}



async function remove(req, res) {
  try {
    const data = await Booking.findOne({ _id: req.params._id }).sort({ _id: -1 });
    await data.deleteOne();
    res.redirect("/admin/booking");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/booking");
  }
}

module.exports = { home, remove, edit, show };
