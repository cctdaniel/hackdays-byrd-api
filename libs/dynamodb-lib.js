import AWS from "aws-sdk"

const client = new AWS.DynamoDB.DocumentClient()

export default {
  query: (params) => client.query(params).promise(),
}
