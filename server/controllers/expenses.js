const AWS = require("aws-sdk");
const { v4 } = require("uuid");

// +------------------------------------------------+
// |                 TABLE SCHEMA                   |
// +----------------------+-------------------------+
// | email                | expenses                |
// +----------------------+-------------------------+
// | test@gmail.com       | TODO: ???               |
// +----------------------+-------------------------+

const handlePostExpense = async (req, res) => {
  const expensesFormData = req.body;
  const userEmail = req.headers["user-email"];

  const newExpenseItem = {
    email: userEmail,
    expenses: {
      [`${v4()}`]: { ...expensesFormData },
    },
  };

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    const { Item } = await docClient
      .get({
        TableName: `${process.env.EXPENSES_TABLE_NAME}`,
        Key: { email: userEmail },
      })
      .promise();

    if (Item?.expenses) {
      newExpenseItem.expenses = {
        ...newExpenseItem.expenses,
        ...Item.expenses,
      };
    }

    await docClient
      .put({
        TableName: `${process.env.EXPENSES_TABLE_NAME}`,
        Item: newExpenseItem,
      })
      .promise();

    res.json(true);
  } catch (error) {
    res.json({
      message: "there was a error with the database, please try again",
    });
  }
};

const handleDeleteExpense = async (req, res) => {
  const id = req.body.id;
  const userEmail = req.body.email;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    // first: GET the item
    const { Item } = await docClient
      .get({
        TableName: `${process.env.EXPENSES_TABLE_NAME}`,
        Key: { email: userEmail },
      })
      .promise();

    if (Item?.expenses) {
      // second: Make a new updated Item, without the id item
      const item = Item?.expenses;
      delete item[id];

      // third: push to the DB the new Item
      await docClient
        .update({
          TableName: `${process.env.EXPENSES_TABLE_NAME}`,
          Key: { email: userEmail },
          UpdateExpression: "SET expenses = :expensesItem",
          ExpressionAttributeValues: { ":expensesItem": item },
        })
        .promise();

      res.json({ message: "item succesfully deleted" });
    } else {
      res.json({ message: "Server error, try again later" });
    }
  } catch (error) {
    res.json({ error });
  }
};

const handleGetExpenses = async (req, res) => {
  const userEmail = req.headers["user-email"];

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    const { Item } = await docClient
      .get({
        TableName: `${process.env.EXPENSES_TABLE_NAME}`,
        Key: { email: userEmail },
      })
      .promise();

    if (Item?.expenses) {
      res.json(Item.expenses);
    } else {
      res.json({});
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  handlePostExpense,
  handleGetExpenses,
  handleDeleteExpense,
};
