'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {

  const params = {
    TableName: 'invoices',
    Key: {
      id: event.pathParameters.id
    }
  };

  return new Promise((resolve, reject) => {

      dynamoDb.get(params, (error, data) => {
          if (error) {
              reject(error);
          }
          resolve(data.Item);
      });
  });
};
