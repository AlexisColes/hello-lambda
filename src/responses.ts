export enum Code {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}

export const error = (code: Code, message: string) =>{
  return {
    statusCode: code,
    body: JSON.stringify({ error: message }),
  }
}
export const ok = (code: Code, body: string) => {
  return {
    statusCode: code,
    body: body,
  }
}
