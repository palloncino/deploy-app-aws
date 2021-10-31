const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { getBaseUrls } = require("../utils/getEnvBaseUrls");
const baseUrls = getBaseUrls();
const fs = require("fs");

// +----------------------------------------------------------------------------------------------------+
// |                                           TABLE SCHEMA                                             |
// +----------------------+-------------------------+-------------------------+-------------------------+
// | email                | created_when            | email_verified          | password                |
// +----------------------+-------------------------+-------------------------+-------------------------+
// | test@gmail.com       | 2021-10-12T09:03:08...  | false                   | $2a$10$A57prqKZU5P...   |
// +----------------------+-------------------------+-------------------------+-------------------------+

const handleEmailCheckExistance = async (req, res) => {
  const email = req.body.email;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: `${process.env.AUTH_TABLE_NAME}`,
    Key: { email: email },
  };

  try {
    const response = await docClient.get(params).promise();

    let emailExists;

    if (response.Item) {
      emailExists = true;
    } else {
      emailExists = false;
    }

    res.send(emailExists);
  } catch (error) {
    res.json(false);
  }
};

const handleSignUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword; // TODO: to implement

  const dateISOString = new Date().toISOString();
  const email_verified = false;

  const salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    await docClient
      .put({
        TableName: `${process.env.AUTH_TABLE_NAME}`,
        Item: {
          email: email,
          password: hashedPassword,
          created_when: dateISOString,
          email_verified: email_verified,
          avatar_url: null,
        },
      })
      .promise();

    const oAuth2Client = new google.auth.OAuth2(
      `${process.env.GOOGLE_CLIENT_ID}`,
      `${process.env.GOOGLE_CLIENT_SECRET}`,
      `${process.env.GOOGLE_REDIRECT_URI}`
    );
    oAuth2Client.setCredentials({
      refresh_token: `${process.env.GOOGLE_REFRESH_TOKEN}`,
    });
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: `OAuth2`,
        user: `${process.env.ADMIN_EMAIL}`,
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        refreshToken: `${process.env.GOOGLE_REFRESH_TOKEN}`,
        accessToken: `${accessToken}`,
      },
    });
    const token = jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "2h",
    });
    const emailOptions = {
      from: `"antonioguiotto.com" <${process.env.ADMIN_EMAIL}>`,
      to: `${email}`,
      subject: "Verification Email - antonioguiotto.com",
      html: `
        <div>
          <h1>Email Verification Link</h1>
          <h3>Click the link to be redirected to the activation page</h3>
          <a href="${baseUrls.ENV_BASE_URL}/auth/verify_email?token=${token}" target="_blank">ACTIVATE</a>
        </div>
      `,
    };
    transport.sendMail(emailOptions, (error) => {
      if (error) {
        res.json(
          `${error}: Please contanct support at powerhydratoni@gmail.com`
        );
      } else {
        res.json({
          message: `Verification email was sent to ${email}, please verify by clicking the activation link`,
        });
      }
    });
  } catch (error) {
    res.json(`${error}: Please contanct support at powerhydratoni@gmail.com`);
  }
};

const handleSignIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: `${process.env.AUTH_TABLE_NAME}`,
    Key: { email: email },
  };

  try {
    const data = await docClient.get(params).promise();
    const retrievedEmail = data?.Item?.email;
    const retrievedHashPassword = data?.Item?.password;

    if (retrievedEmail && retrievedHashPassword) {
      const isRegistered = bcrypt.compareSync(password, retrievedHashPassword);

      if (isRegistered) {
        const token = jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, {
          expiresIn: "2h",
        });

        const payload = {
          email: email,
          token: token,
        };

        return res.json(payload);
      } else {
        res.status(404).json({ message: "Wrong password 🔒" });
      }
    } else {
      res.status(404).json({
        message: "We did not found you in the database, please register ✍🏻",
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const handleGetUserData = async (req, res) => {
  const clientId = req.user.email;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const data = await docClient
    .get(
      {
        TableName: process.env.AUTH_TABLE_NAME,
        Key: {
          email: clientId,
        },
      },
      (err) => {
        if (err) console.log({ err });
      }
    )
    .promise();

  res.json({ data });
};

const isAuthorized = async (req, res) => {
  const user = req.user;
  if (user) {
    res.json(true);
  } else {
    res.json(false);
  }
};

const isEmailVerified = async (req, res) => {
  const email = req.body.email;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: `${process.env.AUTH_TABLE_NAME}`,
    Key: { email: email },
  };

  const data = await docClient.get(params).promise();

  const isEmailVerified = data?.Item?.email_verified;

  if (isEmailVerified) {
    res.json(true);
  } else {
    res.json(false);
  }
};

const handleVerificationLink = async (req, res) => {
  const token = req.query.token;
  const decodedJwt = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  const email = decodedJwt?.email ?? false;

  if (email) {
    AWS.config.update({
      region: `${process.env.AWS_REGION}`,
      accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
      secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    try {
      await docClient
        .update({
          TableName: `${process.env.AUTH_TABLE_NAME}`,
          Key: { email: `${email}` },
          UpdateExpression: "SET email_verified = :bool",
          ExpressionAttributeValues: { ":bool": true },
        })
        .promise();

      res.redirect(`${baseUrls.ENV_CLIENT_URL}`);
    } catch (error) {
      res.json({ error });
    }
  } else {
    res.json(false);
  }
};

const handleDeleteAccount = async (req, res) => {
  const email = req.body.email;

  AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  await docClient
    .delete({
      TableName: `${process.env.AUTH_TABLE_NAME}`,
      Key: { email: `${email}` },
    })
    .promise();

  await docClient
    .delete({
      TableName: `${process.env.EXPENSES_TABLE_NAME}`,
      Key: { email: `${email}` },
    })
    .promise();

  res.json({ message: `Account deleted: ${email}` });
};

const handleUploadImage = async (req, res) => {
  const S3 = new AWS.S3({
    accessKeyId: `${process.env.AWS_PROFILE_KEY}`,
    secretAccessKey: `${process.env.AWS_PROFILE_SECRET}`,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const image = req.files.image;
  const fileName = `${req.user.email}-${image.name}`;

  const path = `${__dirname}/../temp/${fileName}`;

  image.mv(path, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: "Unable to upload", error });
    }
  });

  fs.readFile(path, (err, data) => {
    if (err) {
      return console.log(err);
    }

    S3.upload(
      {
        Bucket: process.env.AVATARS_BUCKET_NAME,
        Key: fileName,
        Body: data,
      },
      (error, data) => {
        if (error) {
          return res.end({ message: "Unable to upload", error });
        } else {
          try {
            docClient.update(
              {
                TableName: process.env.AUTH_TABLE_NAME,
                Key: {
                  email: `${req.user.email}`,
                },
                UpdateExpression: "set avatar_url = :url",
                ExpressionAttributeValues: {
                  ":url": data.Location,
                },
              },
              (err) => {
                if (err) console.log(err);
              }
            );
            res.json({ image_url: data.Location });
          } catch (error) {
            res.json({ error });
          }
        }
      }
    );
  });
};

module.exports = {
  handleSignUp,
  handleSignIn,
  handleGetUserData,
  handleEmailCheckExistance,
  isAuthorized,
  isEmailVerified,
  handleVerificationLink,
  handleDeleteAccount,
  handleUploadImage,
};
