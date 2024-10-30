import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/user.model";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          succeess: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        succeess: true,
        message: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while getting messages", error);
    return Response.json(
      {
        succeess: false,
        message: "Error while getting messages",
      },
      {
        status: 500,
      }
    );
  }
}
