require('dotenv').config();
const ImageKit = require("imagekit");

let imagekit = null;

function initImageKit() {
  if (imagekit) return imagekit;

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    // Do not throw here to avoid crashing the app on startup.
    // Upload attempts will throw a clear error instead.
    console.warn("ImageKit not configured: missing IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY or IMAGEKIT_URL_ENDPOINT");
    imagekit = null;
    return null;
  }

  imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
  });

  return imagekit;
}

const uploadFile = async (file, fileName) => {
  const ik = initImageKit();
  if (!ik) {
    throw new Error('ImageKit not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT in your environment.');
  }

  // ImageKit accepts base64 encoded strings for file content. If the caller
  // passed a Buffer (e.g. multer's req.file.buffer), convert to base64.
  let fileData = file;
  try {
    if (Buffer.isBuffer(file)) {
      fileData = file.toString('base64');
    }

    const result = await ik.upload({
      file: fileData,
      fileName: fileName
    });

    return result;
  } catch (err) {
    // Re-throw with clearer message for debugging
    const e = new Error(`Image upload failed: ${err.message}`);
    e.original = err;
    throw e;
  }
};

module.exports = { uploadFile };
