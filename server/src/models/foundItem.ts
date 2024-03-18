import { ObjectId } from "mongodb";
import mongoose, { Document as Doc, Model } from "mongoose";

export interface TFoundItem {
  status: boolean;
  found_date: Date;
  finderName: string;
  finderContact: string;
  placeFound: string;
  itemType: string;
}

export interface TFoundItemDoc extends Doc, TFoundItem {}

interface TFoundItemModel extends Model<TFoundItemDoc> {
  build(attrs: TFoundItem): TFoundItemDoc;
}

const FoundItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
  },
  finderName: {
    type: String,
  },
  finderContact: {
    type: String,
  },
  found_date: {
    type: String,
  },
  description: {
    type: String,
  },
  placeFound: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: ObjectId,
    ref: "User",
  },
});

FoundItemSchema.set("timestamps", true);

const FoundItem: TFoundItemModel = (mongoose.models?.FoundItem ||
  mongoose.model<TFoundItemDoc, TFoundItemModel>(
    "FoundItem",
    FoundItemSchema
  )) as TFoundItemModel;

export { FoundItem };
