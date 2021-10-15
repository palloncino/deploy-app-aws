const AWS = require("aws-sdk");

// +------------------------------------------------+
// |                 TABLE SCHEMA                   |
// +----------------------+-------------------------+
// | id                   | html                    |
// +----------------------+-------------------------+
// | content-editable...  | <!DOCTYPE html> <htm... |
// +----------------------+-------------------------+

async function handleGetFields(req, res) {
  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: `${process.env.PORTFOLIO_TABLE_NAME}`,
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error(`FAILED: Unable to get data ${err}`);
      res.json(`FAILED: Unable to updated item`);
    } else {
      res.json({ data });
    }
  });
}

function handleEditField(req, res) {
  const { id, html } = req.body;
  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: process.env.AWS_PROFILE_KEY,
    secretAccessKey: process.env.AWS_PROFILE_SECRET,
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: `${process.env.PORTFOLIO_TABLE_NAME}`,
    Item: {
      id: id,
      html: html,
    },
  };
  docClient.put(params, function (err /*, data */) {
    if (err) {
      console.error(`FAILED: Unable to updated item: ${id}`);
      res.json(`FAILED: Unable to updated item: ${id}`);
    } else {
      res.json({ message: `Updated item: ${id}` });
    }
  });
}

module.exports = {
  handleEditField,
  handleGetFields,
};
