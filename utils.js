const fs = require ("fs");
exports.getFileContent = (filePath) => {
  try {
    if(fs.existsSync(filePath)){
        const fileData = fs.readFileSync(filePath,  "utf-8");
        return JSON.parse(fileData);
    } else return {error: "File does not exist"}
  } catch (error) {
    return {error}
  }
}

exports.createFile = (fileName, data) => {
  try {
    const create =  fs.writeFile(fileName, data, "utf-8");
    if(create) throw new Error(create)
    return {success:true}
  } catch (error) {
    return {error: error.message}
  }
}

exports.buildAccount = (accountObj) => {
  const {_id, ...data} = accountObj;
  data.id = _id;
  return data;
}