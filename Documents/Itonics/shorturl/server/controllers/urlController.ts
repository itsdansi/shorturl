import express, { Request, Response, NextFunction } from 'express';
import { Urls } from '../models/url';
require('dotenv').config();
import * as shortid from 'shortid';
let baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;

interface URL {
  fullUrl: string;
  shortUrl: string;
  clicks: number;
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.params);
  const url = await Urls.find({ user: req.params.uid });

  if (!url) {
    res.status(500).json({
      success: false,
      message: 'No url found with that user id',
    });
  } else res.send(url);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result: URL = await Urls.create({
      fullUrl: req.body.fullUrl,
      user: req.body.user,
    });
    res.status(201).json({
      success: true,
      message: 'shortURL created successfully',
      data: ` ${baseUrl}/${result.shortUrl}`,
    });
  } catch (err) {
    res.status(400).send(`An error occurred: ${err}`);
  }
};
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const shortUrl = await Urls.findOne({ shortUrl: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl
    .save()
    .then((result: URL) => res.redirect(result.fullUrl))
    .catch((error: any) => res.status(501).send(error));
};
