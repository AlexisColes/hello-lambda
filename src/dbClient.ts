import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dbTableName = "users"

export interface User {
  username: string
  dateOfBirth: string
}

export const putUser = async (user: User) => {const params = {
  TableName: 'users',
    Item: user,
  };

  await dynamoDB.put(params).promise();
}

export const getUser = async (username: string): Promise<User | undefined> => {
    
  const params = {
    TableName: dbTableName,
    Key: {
      username,
    },
  };
  const result = await dynamoDB.get(params).promise();
  const user = result.Item;

  if (!user) return undefined

  return {
    username: user.username,
    dateOfBirth: user.dateOfBirth
  }
}
