const AWS = require("aws-sdk");
const { v4 } = require("uuid");

// +------------------------------------------------+
// |                 TABLE SCHEMA                   |
// +----------------------+-------------------------+
// | email                | posts                   |
// +----------------------+-------------------------+
// | example_email@gm...  | [ { "M" : { "descrip... |
// +----------------------+-------------------------+


async function handleGetPosts(req, res) {

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  try {
    const { Item } = await docClient
      .get({
        TableName: `${process.env.POSTS_TABLE_NAME}`,
        Key: { email: `${process.env.ADMIN_EMAIL}` },
      })
      .promise();

    if (Item?.posts) {

      res.json(Item.posts)
      
    } else (
      res.json({message: 'No posts available'})
    )

  } catch (error) {
    res.json(error);
  }
}

async function handlePostPost(req, res) {
  
  const { email: userEmail, title, description, html } = req.body;
  const id = v4();

  if (!userEmail===process.env.ADMIN_EMAIL) {
    return res.json(403);
  }

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: process.env.AWS_PROFILE_KEY,
    secretAccessKey: process.env.AWS_PROFILE_SECRET,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  let posts = {}

  try {

    const response = await docClient
      .get({
        TableName: `${process.env.POSTS_TABLE_NAME}`,
        Key: { email: userEmail },
      })
      .promise();

      const retrievedPosts = response?.Item?.posts;

      if (retrievedPosts) {

        posts = [ ...retrievedPosts, { id: id, title: title, description: description, html: html } ]

      } else {

        posts = [ { id: id, title: title, description: description, html: html } ]

      }

    docClient.put({
      TableName: `${process.env.POSTS_TABLE_NAME}`,
      Item: { email: userEmail, posts }
    }, (err) => {
      if (err) {
        console.error(`FAILED: ${err}`);
        res.json(`FAILED: ${err}`);
      } else {
        res.json({ message: `Item succefully created: ${id}: ${html}` });
      }
    });

  } catch (error) {

    res.json(error);

  }
}

module.exports = {
  handleGetPosts,
  handlePostPost,
};
