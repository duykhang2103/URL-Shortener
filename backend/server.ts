import app from "./app";
import connectToDB from "./config/db";
import { keys } from "./config/const";

const bootstrap = async () => {
  await connectToDB();
  app.listen(keys.PORT, () => {
    console.log(`Server is running on port ${keys.PORT}`);
    console.log(`Environment: ${keys.NODE_ENV}`);
  });
};

bootstrap();
