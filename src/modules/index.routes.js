"use strict";

import messageRouter from "./messages/message.routes.js";
import photoRouter from "./photos/photos.routes.js";
import userRouter from "./users/user.routes.js";

export const bootstrap = (app) => {
  app.use("/api/v1", userRouter);
  app.use("/api/v1", messageRouter);
  app.use("/api/v1", photoRouter);
};
