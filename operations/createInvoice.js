'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event) => {
  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'invoices',
    Item: data
  };

  return new Promise((resolve, reject) => {

      dynamoDb.put(params, (error, data) => {
          if (error) {
              reject(error);
          }
          resolve(params.Item);
      });
  });

};
