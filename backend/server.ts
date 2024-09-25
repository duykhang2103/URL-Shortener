import app from "./app";
import connectToDB from "./config/db";

const bootstrap = async () => {
  // await RedisClient.connect();
  await connectToDB();
  app.listen(8000, () => {
    console.log("Server is running on: http://localhost:8000");
  });
};

bootstrap();
