
// import * as AWSMock from 'aws-sdk-mock'

// export interface User {
//   username: string
//   dateOfBirth: string
// }

// export const mockDbGet = (users: ) => {
//   AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: any, callback: any) => {
//     // Assuming your test case will cover both cases, found user and not found user
//     if (params.Key.username === 'existingUsername') {
//       callback(null, { Item: { username: 'existingUsername', dateOfBirth: '1990-01-01' } });
//     } else {
//       callback(null, {});
//     }
//   });
// } 