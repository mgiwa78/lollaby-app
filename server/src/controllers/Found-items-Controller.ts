import { Request, Response } from "express";
import { FoundItem, TFoundItem } from "../models/foundItem";

export const Create__FOUND_ITEM__POST = async (req: Request, res: Response) => {
  console.log("items");
  try {
    const { status,finderContact, found_date, finderName, placeFound, itemType } = req.body;

    const item: TFoundItem = await FoundItem.create({
      status,
      found_date,
      finderName,
      placeFound,finderContact,
      itemType,
    });

    return res.json(item);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__FOUND_ITEM__PUT = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { category, vendor, name, price, qrCode, description } = req.body;

    await FoundItem.findByIdAndUpdate(itemId, {
      category,
      vendor,
      name,
      price,
      qrCode,
      description,
    });

    const item = await FoundItem.findById(itemId);
    return res.json({ status: "success", data: item });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__FOUND_ITEMS__GET = async (req: Request, res: Response) => {
  try {
    console.log("items");
    const items = await FoundItem.find();
    console.log(items);
    return res.json(items);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__FOUND_ITEM__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { itemId } = req.params;
    await FoundItem.findByIdAndDelete(itemId);
    const items = await FoundItem.find();

    return res.json({ status: "success", data: items });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
