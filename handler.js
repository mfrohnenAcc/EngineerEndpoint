'use strict';

let AWS = require("aws-sdk");

module.exports.readDB = async event => {
  let docClient = new AWS.DynamoDB.DocumentClient();
  const requestBody = JSON.parse(event.body)
  let name = requestBody.engname
  let params = {
    TableName: "mainTable",
    Key: {
      name: name
    }
  };
  let result;
  let putItem = new Promise((res, rej) => {
    docClient.get(params, function (err, data) {
      if (err) {
        rej("Unable to read item. Error JSON:" + JSON.stringify(err, null, 2));
      } else {
        res(JSON.stringify(data, null, 2));
      }
    });
  });
  result = await putItem;
  return {
    statusCode: 200,
    body: result,
  };
};

module.exports.writeDB = async event => {
  let docClient = new AWS.DynamoDB.DocumentClient();
  const requestBody = JSON.parse(event.body)
  let name = requestBody.engname
  let role = requestBody.engrole
  let params = {
    TableName: "mainTable",
    Item: {
      "name": name,
      "role": role
    }
  };
  let result;
  let putItem = new Promise((res, rej) => {
    docClient.put(params, function (err, data) {
      if (!err) {
        res(JSON.stringify(data, null, 2))
      } else {
        rej("Unable to write item. Error JSON:" + JSON.stringify(err, null, 2))
      }
    });
  });
  result = await putItem;
  return {
    statusCode: 200,
    body: result,
  };
};
