// MVC
const mailer = require("../mailer/index");

const Testimonials = require("../models/Testimonial");
const Cars = require("../models/Car");
const Contact = require("../models/Contact");
const Booking = require("../models/Booking");

const twilio = require("twilio");
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function homePage(req, res) {
  try {
    const testimonials = await Testimonials.find().sort({ _id: -1 });
    const cars = await Cars.find({ active: true }).sort({ _id: -1 });
    res.render("index", {
      session: req.session,
      title: "Home",
      cars: cars,
      testimonials: testimonials,
    });
  } catch (error) {
    console.log(error);
  }
}

async function bookingPage(req, res) {
  try {
    const testimonials = await Testimonials.find().sort({ _id: -1 });
    const cars = await Cars.find({ active: true }).sort({ _id: -1 });
    res.render("booking", {
      session: req.session,
      title: "Booking",
      cars: cars,
      testimonials: testimonials,
    });
  } catch (error) {
    console.log(error);
  }
}

async function bookingStorePage(req, res) {
  try {
    var data = new Booking(req.body);
    data.date = new Date();
    await data.save();

    await twilioClient.messages.create({
      body: `
            Booking Confirmed!!! Hello ${req.body.name}, Your Booking has Been Confirmed, Our Team will Contact You Soon!!!
        `,
      from: process.env.SMS_SENDER,
      to: req.body.phone.startsWith("+91")
        ? req.body.phone
        : "+91" + req.body.phone,
    });
    

    mailer.sendMail(
      {
        sender: process.env.EMAIL_SENDER,
        to: req.body.email,
        subject: `
        Booking Confirmed!!! 
        Hello ${req.body.name}, Your Booking has Been Confirmed, Our Team will Contact You Soon!!!
    `,
      },
      (error) => {
        if (error) {
        }
      }
    );
    mailer.sendMail(
      {
        sender: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_SENDER,
        subject: "New Booking Received",
        html: `
            <table border="2px" cellpadding="10px">
                <tr>
                    <th>Name</th>
                    <td>${req.body.name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${req.body.email}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${req.body.phone}</td>
                </tr>
                <tr>
                    <th>Pickup</th>
                    <td>${req.body.pickUp}</td>
                </tr>
                <tr>
                    <th>Drop</th>
                    <td>${req.body.drop}</td>
                </tr>
                <tr>
                    <th>Pickup Date</th>
                    <td>${req.body.pickUpDate}</td>
                </tr>
                <tr>
                    <th>car</th>
                    <td>${req.body.car}</td>
                </tr>
            </table>
        `,
      },
      (error) => {
        if (error) {
        }
      }
    );

    res.redirect("/booking-confirmation");
  } catch (error) {
    errorMessage = {};
    const testimonials = await Testimonials.find().sort({ _id: -1 });
    const cars = await Cars.find({ active: true }).sort({ _id: -1 });
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.email
      ? (errorMessage["email"] = error.errors?.email.message)
      : "";
    error.errors?.phone
      ? (errorMessage["phone"] = error.errors?.phone.message)
      : "";
    error.errors?.pickUp
      ? (errorMessage["pickUp"] = error.errors?.pickUp.message)
      : "";
    error.errors?.drop
      ? (errorMessage["drop"] = error.errors?.drop.message)
      : "";
    error.errors?.car ? (errorMessage["car"] = error.errors?.car.message) : "";
    error.errors?.pickUpDate
      ? (errorMessage["pickUpDate"] = error.errors?.pickUpDate.message)
      : "";
    if (req.body.page === "Home")
      res.render("index", {
        session: req.session,
        title: "Booking",
        cars: cars,
        testimonials: testimonials,
        data,
        errorMessage
      });
    else
      res.render("booking", {
        session: req.session,
        title: "Booking",
        cars: cars,
        testimonials: testimonials,
        data,
        errorMessage
      });
    console.log(error);
  }
}

async function bookingConfirmation(req, res) {
  res.render("booking-confirm", { title: "Booking Confirmation" });
}

function aboutPage(req, res) {
  res.render("aboutPage", { session: req.session, title: "About US" });
}
function servicePage(req, res) {
  res.render("servicePage", { session: req.session, title: "Service" });
}
function featurePage(req, res) {
  res.render("featurePage", { session: req.session, title: "Features" });
}
async function carPage(req, res) {
  try {
    const cars = await Cars.find().sort({ _id: 1 });
    res.render("carsPage", { session: req.session, title: "Cars", cars: cars });
  } catch (error) {
    console.log(error);
  }
}
async function testimonialPage(req, res) {
  try {
    const testimonials = await Testimonials.find().sort({ _id: 1 });
    res.render("testimonialPage", {
      session: req.session,
      title: "Testimonials",
      testimonials: testimonials,
    });
  } catch (error) {
    console.log(error);
  }
}
function contactPage(req, res) {
  res.render("contact", {
    session: req.session,
    title: "Contact Us",
    errorMessage: {},
    data: {},
    show: false,
  });
}
async function contactStorePage(req, res) {
  try {
    var data = new Contact(req.body);
    data.date = new Date();
    await data.save();

    
    await twilioClient.messages.create({
      body: `
            Query Recieved !!! Thanks ${req.body.name}, Our Team will Contact You Soon!!!
        `,
      from: process.env.SMS_SENDER,
      to: req.body.phone.startsWith("+91")
        ? req.body.phone
        : "+91" + req.body.phone,
    });
    

    mailer.sendMail(
      {
        sender: process.env.EMAIL_SENDER,
        to: req.body.email,
        subject: `
        Query Recieved !!! Thanks ${req.body.name}, Our Team will Contact You Soon!!!
    `,
      },
      (error) => {
        if (error) {
        }
      }
    );
    mailer.sendMail(
      {
        sender: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_SENDER,
        subject: "New Query Received",
        html: `
            <table border="2px" cellpadding="10px">
                <tr>
                    <th>Name</th>
                    <td>${req.body.name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${req.body.email}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${req.body.phone}</td>
                </tr>
                <tr>
                    <th>Subject</th>
                    <td>${req.body.subject}</td>
                </tr>
                <tr>
                    <th>Message</th>
                    <td>${req.body.message}</td>
                </tr>
            </table>
        `,
      },
      (error) => {
        if (error) {
        }
      }
    );
    res.render("contact", {
      session: req.session,
      title: "Contact Us",
      errorMessage: {},
      data: {},
      show: true,
    });
  } catch (error) {
    console.log(error);
    errorMessage = {};
    error.errors?.name
      ? (errorMessage["name"] = error.errors?.name.message)
      : "";
    error.errors?.email
      ? (errorMessage["email"] = error.errors?.email.message)
      : "";
    error.errors?.phone
      ? (errorMessage["phone"] = error.errors?.phone.message)
      : "";
    error.errors?.subject
      ? (errorMessage["subject"] = error.errors?.subject.message)
      : "";
    error.errors?.message
      ? (errorMessage["message"] = error.errors?.message.message)
      : "";
    res.render("contact", {
      session: req.session,
      title: "Contact Us",
      errorMessage: errorMessage,
      data: req.body,
      show: false,
    });
  }
}
function notFoundPage(req, res) {
  res.render("404", { session: req.session, title: "404! Page Not Found" });
}

module.exports = {
  homePage,
  aboutPage,
  servicePage,
  featurePage,
  carPage,
  testimonialPage,
  contactPage,
  notFoundPage,
  contactStorePage,
  bookingPage,
  bookingStorePage,
  bookingConfirmation,
};
