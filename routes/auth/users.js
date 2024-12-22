import UserModel from "../../models/Users.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import generateToken from "./generateToken.js";

export default async function userRouter(fastify, options) {
  fastify.post("/signup", async (request, reply) => {
    let { username, email, password } = request.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (username === "" || password === "" || email === "") {
      return reply.code(400).send({
        status: "FAILED",
        message: "Empty input fields",
      });
    }

    if (!/^[a-zA-Z]*$/.test(username)) {
      return reply.code(400).send({
        status: "FAILED",
        message: "Invalid name entered",
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return reply.code(400).send({
        status: "FAILED",
        message: "Invalid email entered",
      });
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/.test(
        password
      )
    ) {
      return reply.code(400).send({
        status: "FAILED",
        message:
          "Password must be 8 characters long, contain at least one uppercase letter, lowercase letter, number, and a special character. It also cannot contain spaces.",
      });
    }

    try {
      const result = await UserModel.find({ email });
      if (result.length) {
        return reply.code(400).send({
          status: "FAILED",
          message: "User with the provided email already exists",
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      const createdUser = await UserModel.create(newUser);

      const token = jwt.sign(
        { id: createdUser._id, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return reply.code(200).send({
        status: "SUCCESS",
        message: "Signup successful",
        data: { username, email },
        accessToken: token,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        status: "FAILED",
        message: "An error occurred while processing the request",
      });
    }
  });

  fastify.post("/signin", async (request, reply) => {
    dotenv.config();

    let { email, password } = request.body;

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      return reply.code(400).send({
        status: "FAILED",
        message: "Empty credentials supplied",
      });
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return reply.code(404).send({
          status: "FAILED",
          message: "Requested user doesn't exist",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return reply.code(400).send({
          status: "FAILED",
          message: "Invalid password entered",
        });
      }

      const accessToken = await generateToken(user, "access", "15m");
      const refreshToken = await generateToken(user, "refresh", "7d");

      user.refreshToken = refreshToken;
      await user.save();

      return reply.code(200).send({
        status: "SUCCESS",
        message: "Signin successful",
        data: {
          id: user._id,
          email: user.email,
        },
        accessToken: accessToken,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        status: "FAILED",
        message: "An error occurred while processing the request",
      });
    }
  });

  fastify.post("/token", async (request, reply) => {
    const { token: refreshToken } = request.body;
    if (!refreshToken)
      return reply
        .code(401)
        .send({ status: "FAILED", message: "Refresh token is required" });

    try {
      const user = await UserModel.findOne({ refreshToken });
      if (!user)
        return reply
          .code(403)
          .send({ status: "FAILED", message: "Invalid refresh token" });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err)
            return reply
              .code(403)
              .send({ status: "FAILED", message: "Token verification failed" });

          const accessToken = await generateToken(user, "access", "15m");
          reply.code(200).send({ status: "SUCCESS", accessToken });
        }
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send("Server error");
    }
  });

  fastify.delete("/logout", async (request, reply) => {
    const { token: requestToken } = request.body;

    if (!requestToken) {
      return reply.code(400).send({
        status: "FAILED",
        message: "Token is required",
      });
    }

    try {
      const user = await UserModel.findOne({ refreshToken: requestToken });

      if (!user) {
        return reply.code(404).send({
          status: "FAILED",
          message: "User with the provided token not found",
        });
      }
      user.refreshToken = null;

      await user.save();

      return reply.code(204).send({
        status: "SUCCESS",
        message: "Deleted refresh token",
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        status: "FAILED",
        message: "An error occurred while processing the request",
      });
    }
  });
}
