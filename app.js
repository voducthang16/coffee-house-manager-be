var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var productRouter = require("./routes/products");
var orderRouter = require("./routes/orders");
var orderDetailRouter = require("./routes/orders_detail");
var categoryRouter = require("./routes/category");
var tableRouter = require("./routes/table");
const multer = require("multer");

var app = express();
var cors = require("cors");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.options("*", cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

const upload = multer({ storage: storage });

app.post("/api/image", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.send({ code: 500, msg: "error" });
    } else {
        res.send({ code: 200, msg: "upload success", img: req.file.filename });
    }
});

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/orders-detail", orderDetailRouter);
app.use("/category", categoryRouter);
app.use("/table", tableRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
