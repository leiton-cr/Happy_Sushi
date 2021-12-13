interface ImageUpload{
  name: String,
  data: Buffer,
  size: Number,
  encoding: String,
  tempFilePath: String,
  truncated: Boolean,
  mimetype: String,
  md5: String,
  mv: Function
}