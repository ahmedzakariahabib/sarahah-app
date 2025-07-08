import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    img: String,
    images: [{ type: String }],
  },
  { timestamps: true }
);

//init work with find and loop on each object and put in doc variable and update each doc with new path

schema.post("init", (doc) => {
  doc.img = process.env.BASE_URL + doc.img;
});

export const photoModel = mongoose.model("photo", schema);
