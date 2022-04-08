import express, { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

import * as bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user: User) => {
      if (user) {
        return res.status(409).json({
          error: "Email is taken already!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err: any, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            newUser.save((err: any, user: User) => {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              } else {
                res.status(201).json({
                  message: "User created",
                });
              }
            });
          }
        });
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);

  User.findOne({ email: req.body.email })
    .exec()
    .then((user: User) => {
      if (!user) {
        return res.status(401).json({
          error: "Email or password is incorrect",
        });
      }
      bcrypt.compare(
        req.body.password,
        user.password,
        (err: any, result: boolean) => {
          if (err) {
            return res.status(401).json({
              error: "Email or password is incorrect",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              process.env.SECRET,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              user: [{ id: user._id, email: user.email }],
            });
          }
          return res.status(401).json({
            error: "Email or password is incorrect",
          });
        }
      );
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {};
