import { Request, Response } from "express";
import { LostItem, TLostItem } from "../models/lostItem";

export const Create__LOST_ITEM__POST = async (req: Request, res: Response) => {
  try {
    const { status, ownerContact, date_lost, ownerName, placeLost, itemType } =
      req.body;

    const item: TLostItem = await LostItem.create({
      status,
      date_lost,
      ownerName,
      placeLost,
      ownerContact,
      itemType,
    });

    return res.json(item);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__LOST_ITEM__PUT = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { category, vendor, name, price, qrCode, description } = req.body;

    await LostItem.findByIdAndUpdate(itemId, {
      category,
      vendor,
      name,
      price,
      qrCode,
      description,
    });

    const project = await LostItem.findById(itemId);
    return res.json({ status: "success", data: project });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__LOST_ITEMS__GET = async (req: Request, res: Response) => {
  try {
    const items = await LostItem.find();

    return res.json(items);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__LOST_ITEM__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { itemId } = req.params;
    await LostItem.findByIdAndDelete(itemId);
    const projects = await LostItem.find();

    return res.json({ status: "success", data: projects });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
