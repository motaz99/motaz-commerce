const { google } = require('googleapis');
const { Readable } = require('stream');

const authorize = async () => {
  try {
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      [process.env.GOOGLE_SCOPE]
    );

    await jwtClient.authorize();
    return jwtClient;
  } catch (error) {
    console.error(error);
    throw new Error('Authorization failed');
  }
};

const uploadFile = (authClient, image) =>
  new Promise((resolve, rejected) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const readableStream = Readable.from(image.buffer);
    const fileMetaData = {
      name: image.originalname,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: readableStream,
          mimeType: image.mimetype,
        },
        fields: 'id',
      },
      (error, file) => {
        if (error) {
          return rejected(error);
        }
        return resolve({
          ...file,
          url: `https://drive.google.com/uc?id=${file.data.id}`,
        });
      }
    );
  });

module.exports = {
  authorize,
  uploadFile,
};
