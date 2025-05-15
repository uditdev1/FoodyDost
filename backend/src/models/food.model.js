import { model, Schema } from 'mongoose';

export const ReviewSchema = new Schema(
  {
    email : {type : String , required : true},
    name : {type : String , required : true},
    rating: { type: Number, default: 1 },
    comment : {type : String , required : true}
  }
);

export const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    rating : {type : Number , default : 0},
    reviews: { type: [ReviewSchema] }, 
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true },
    cookTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

foodSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) {
    return 1;
  }
  const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / this.reviews.length;
});

export const foodModel = model('food', foodSchema);
