import AWS from "aws-sdk";
import { Code, error, ok } from "./responses";
import { putUser } from "./dbClient";


export const handlePut = async (username: string, body: string | null) => {
  try {
    if (/[^a-zA-Z]/.test(username)) return error(Code.BadRequest, "username can only contain letters")

    if(!body) return error(Code.BadRequest, 'No body provided in request, expected: { "dateOfBirth": "YYYY-MM-DD" }')

    const requestBody = JSON.parse(body)
    const dateOfBirth = requestBody.dateOfBirth;

    if (!dateOfBirth) return error(Code.BadRequest, 'date of birth must be provided, expected: { "dateOfBirth": "YYYY-MM-DD" }')    
    if(!isValidDate(dateOfBirth)) return error(Code.BadRequest, "invalid date of birth provided")

    await putUser({
      username,
      dateOfBirth,
    })

    return ok(Code.NoContent, '');    
  } catch (ex) {
    console.log(ex);
    return error(Code.InternalServerError, "Unexpected exception, please contact technical support")
  }
};



const isValidDate = (dateString: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(dateRegex)) {
    return false;
  }
  const date = new Date(dateString);
  const today = new Date();
  return date instanceof Date && date < today;
};