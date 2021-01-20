const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    console.log(colorHandler("Yellow", undefined, "Trying to connect ...."));
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(colorHandler("Green", "Bold", `Connected to the database`));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
