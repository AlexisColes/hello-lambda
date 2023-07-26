import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { handlePut } from './handlePut';
import { handleGet } from './handleGet';
import { Code, error } from './responses';



export const hello: APIGatewayProxyHandler = async (event, context) => {
  const username = event.pathParameters?.username;
  if (!username) return error(Code.InternalServerError, "missing username, this is a missconfiguration on the server, please contact technical support")

  switch(event.httpMethod){
    case 'PUT':
      return handlePut(username, event.body);
    case 'GET':
      return handleGet(username);
    default:
      return error(Code.MethodNotAllowed, 'Method Not Allowed')
  }
};
