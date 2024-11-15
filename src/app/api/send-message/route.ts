import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
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

    if (user.isAcceptingMessage) {
      return Response.json(
        {
          succeess: false,
          message: "User is not accepting messages.",
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = {
      content: content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        succeess: true,
        message: "Message sent successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while sending message", error);
    return Response.json(
      {
        succeess: false,
        message: "Error while sending message",
      },
      {
        status: 500,
      }
    );
  }
}
