import 'dotenv/config';
import fs from 'fs';
import { Reply } from '../../models/reply.model';
import { connectDb } from '../../db';

const repliesToSeed = JSON.parse(
  fs.readFileSync(__dirname + '/replies.json', 'utf-8')
);

/**
 * BulkUpserts replies checking on the name field to not add replies already in db
 *
 **/
export const bulkAdd = (arrayToBulkAdd) => {
  const bulkOps = arrayToBulkAdd.map((doc) => ({
    updateOne: {
      filter: { intent: doc.intent },
      update: doc,
      upsert: true,
    },
  }));

  Reply.bulkWrite(bulkOps)
    .then(function (characters) {})
    .catch(function (err) {
      console.error(err);
    });
};

connectDb().then(async () => {
  bulkAdd(repliesToSeed);
});
