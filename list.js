import dynamoDb from "./libs/dynamodb-lib"
import handler from "./libs/handler-lib"

export const main = handler(async (event, context) => {
  console.log(event, context)
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "entityId = :entityId",
    ExpressionAttributeValues: {
      ":entityId": event.queryStringParameters["custom:entityId"],
    },
  }

  const result = await dynamoDb.query(params)

  // Return the matching list of items in response body
  return result.Items
})
