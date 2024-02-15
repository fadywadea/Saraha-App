"use strict";

import { connect } from "mongoose";

export function dbConnection() {
  connect("mongodb://127.0.0.1:27017/sara7a").then(() => {
    console.log("Connected to MongoDB");
  });
}
