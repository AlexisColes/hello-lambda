import { handleGet } from '../src/handleGet';
import { Code } from '../src/responses';
import * as AWSMock from 'aws-sdk-mock'
import * as dbClient from '../src/dbClient';

const mockDb = (returnVaule: {username:string, dateOfBirth: string} | null) => {
  AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: any, callback: any) => {
    if (returnVaule) {
      callback(null, { Item: returnVaule });
    } else {
      callback(null, {});
    }
  });
}
jest.mock('../src/dbClient');

afterEach(() => {
  AWSMock.restore('DynamoDB.DocumentClient');
  jest.useRealTimers();
});

describe('handleGet', () => {
  it('should return happy birthday when today is thier birthday', async () => {
    jest.useFakeTimers({
      now: new Date(2023, 5, 30),
      doNotFake: ["setInterval"],
    });
    const user = {
      username: "bob", 
      dateOfBirth: "2000-06-30"
    };

    (dbClient.getUser as jest.Mock).mockResolvedValueOnce(user);
    const response = await handleGet("bob");

    expect(response.statusCode).toBe(Code.Ok);
    expect(JSON.parse(response.body).message).toBe("Hello, bob! Happy birthday!")
  });
  it('should return days till birthday when birthday is to come', async () => {
    jest.useFakeTimers({
      now: new Date(2023, 5, 10),
      doNotFake: ["setInterval"],
    });
    const user = {
      username: "bob", 
      dateOfBirth: "2000-06-30"
    };

    (dbClient.getUser as jest.Mock).mockResolvedValueOnce(user);
    const response = await handleGet("bob");

    expect(response.statusCode).toBe(Code.Ok);
    expect(JSON.parse(response.body).message).toBe("Hello, bob! Your birthday is in 20 day(s)")
  });
  it('should return days till following years birthday when birthday for year has past', async () => {
    jest.useFakeTimers({
      now: new Date(2023, 5, 30),
      doNotFake: ["setInterval"],
    });
    const user = {
      username: "bob", 
      dateOfBirth: "2000-06-29"
    };

    (dbClient.getUser as jest.Mock).mockResolvedValueOnce(user);
    const response = await handleGet("bob");

    expect(response.statusCode).toBe(Code.Ok);
    expect(JSON.parse(response.body).message).toBe("Hello, bob! Your birthday is in 365 day(s)")
  });
});
