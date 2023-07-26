
import { handlePut } from '../src/handlePut';
import * as AWSMock from 'aws-sdk-mock'
import { Code } from '../src/responses';

const mockDb = (returnVaule: {username:string, dateOfBirth: string} | null) => {
  AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: any, callback: any) => {
    if (returnVaule) {
      callback(null, { Item: returnVaule });
    } else {
      callback(null, {});
    }
  });
}

afterEach(() => {
  AWSMock.restore('DynamoDB.DocumentClient');
});


describe('invalid arguments', () => {
  it('should return a bad request when . in name', async () => {

    mockDb(null)
    const response = await handlePut("fred.smith", JSON.stringify({dateOfBirth: "2020-12-30"}));

    expect(response.statusCode).toBe(Code.BadRequest);
  });
  it('should return a bad request when - in name', async () => {

    mockDb(null)
    const response = await handlePut("fred-smith", JSON.stringify({dateOfBirth: "2020-12-30"}));

    expect(response.statusCode).toBe(Code.BadRequest);
  });
});
