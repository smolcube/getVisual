

const reviewSchema = new Schema({
    rating: {
      type: Number,
      enum: ["1", "2", "3", "4", "5"] ,
      required: true,

    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
    },
      required: true,

  });
  