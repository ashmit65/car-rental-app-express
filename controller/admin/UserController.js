var passwordValidator = require("password-validator");
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

const User = require("../../models/User");

async function home(req, res) {
  try {
    const data = await User.find().sort({ _id: -1 });
    res.render("admin/user/index", { session: req.session, title: "Admin User Section", data: data });
  } catch (error) {
    console.log(error);
  }
}

function create(req, res) {
  res.render("admin/user/create", {
    session: req.session, title: "Admin User Section",
    data: {},
    error: {},
  });
}

async function store(req, res) {
  try {
    var data;
    data = new User(req.body);

    if (req.body.password === req.body.cpassword) {
      if (schema.validate(req.body.password)) {
        await data.save();
        return res.redirect("/admin/users");
      } else {
        return res.render("admin/user/create", {
          errorMessage: (errorMessage = {
            password:
              "Invalid Password. It must contain atleast 1 Upper Case Character, 1 Lower Case Character, 1 Digit and Lenght must be 8 Character",
          }),
          data: data,
        });
      }
    } else {
      return res.render("admin/user/create", {
        errorMessage: (errorMessage = {
          password: "Password and Confirm Password Doesn't Match",
        }),
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    errorMessage = {};
    error.keyValue && error.keyValue.username
      ? (errorMessage["username"] = "Username is Already Taken")
      : "";
    error.keyValue && error.keyValue.email
      ? (errorMessage["email"] = "email is Already Taken")
      : "";
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.username
      ? (errorMessage["username"] = error.errors?.username.message)
      : "";
    error.errors?.email
      ? (errorMessage["email"] = error.errors?.email.message)
      : "";
    error.errors?.phone
      ? (errorMessage["phone"] = error.errors?.phone.message)
      : "";
    error.errors?.password
      ? (errorMessage["password"] = error.errors?.password.message)
      : "";
    res.render("admin/user/create", { errorMessage: errorMessage, data: data });
  }
}

async function edit(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id }).sort({ _id: -1 });
    res.render("admin/user/edit", {
      session: req.session, title: "Admin User Section",
      data: data,
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users");
  }
}

async function update(req, res) {
  let data;
  try {
    // Load existing user by id
    data = await User.findById(req.params._id);
    if (!data) {
      return res.redirect("/admin/users");
    }

    // Always update basic fields
    data.name = req.body.name;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.role = req.body.role;
    data.username = req.body.username;

    // If password fields are filled, validate them
    if (req.body.password || req.body.cpassword) {
      if (req.body.password !== req.body.cpassword) {
        return res.render("admin/user/edit", {
          session: req.session, title: "Admin User Section",
          data: data,
          errorMessage: {
            password: "Password and Confirm Password Doesn't Match",
          },
        });
      }

      if (!schema.validate(req.body.password)) {
        return res.render("admin/user/edit", {
          session: req.session, title: "Admin User Section",
          data: data,
          errorMessage: {
            password:
              "Invalid Password. It must contain atleast 1 Upper Case Character, 1 Lower Case Character, 1 Digit and Lenght must be 8 Character",
          },
        });
      }

      data.password = req.body.password;
    }

    await data.save();
    return res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    const errorMessage = {};
    error.keyValue && error.keyValue.username
      ? (errorMessage["username"] = "Username is Already Taken")
      : "";
    error.keyValue && error.keyValue.email
      ? (errorMessage["email"] = "email is Already Taken")
      : "";
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.username
      ? (errorMessage["username"] = error.errors?.username.message)
      : "";
    error.errors?.email
      ? (errorMessage["email"] = error.errors?.email.message)
      : "";
    error.errors?.phone
      ? (errorMessage["phone"] = error.errors?.phone.message)
      : "";
    error.errors?.password
      ? (errorMessage["password"] = error.errors?.password.message)
      : "";
    res.render("admin/user/edit", {
      session: req.session, title: "Admin User Section",
      errorMessage: errorMessage,
      data: data,
    });
  }
}

async function remove(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id }).sort({ _id: -1 });
    await data.deleteOne();
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/users");
  }
}

module.exports = { home, create, store, remove, edit, update };
