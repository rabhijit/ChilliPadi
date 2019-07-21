import fs from "react-native-fs";
import { AccountSchema, JioSchema } from "./src/allSchemas";

const Realm = require('realm');

fs.copyFileAssets('default.realm', fs.DocumentDirectoryPath + '/default.realm');

export default new Realm({
    path: fs.DocumentDirectoryPath + '/default.realm',
    schema: [JioSchema, AccountSchema],
    schemaVersion: 4
});