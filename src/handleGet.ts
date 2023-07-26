import AWS from "aws-sdk";
import { getUser } from "./dbClient";
import { APIGatewayProxyResult } from "aws-lambda";


export const handleGet = async (username: string): Promise<APIGatewayProxyResult> => {
  try {

    const user = await getUser(username)
    
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const today = new Date();
    const bday = new Date(user.dateOfBirth);
    let upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    if(today > upcomingBday) {
      upcomingBday.setFullYear(today.getFullYear() + 1);
    }
    // Calculate the difference in days between the current date and the birthday
    const timeDiff = upcomingBday.getTime() - today.getTime();
    const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let message = '';
    if (daysUntilBirthday === 0) {
      message = `Hello, ${username}! Happy birthday!`;
    } else {
      message = `Hello, ${username}! Your birthday is in ${daysUntilBirthday} day(s)`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected error' }),
    };
  }
};
