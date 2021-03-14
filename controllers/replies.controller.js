import { Reply } from '../models/reply.model';

export const findAll = (req, res) => {
  Reply.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving replies.',
      });
    });
};

export const findOne = (req, res) => {
  const { intent, botId } = req.query;
  const query = { intent };

  Reply.findOne(query).exec((err, reply) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!reply) {
      return res.status(404).send({
        message: `Reply not found in server 2 db for intent: ${intent}`,
      });
    }
    console.log(`found reply for intent: '${intent}' :>> `, reply);
    res.status(200).send(reply);
  });
};

export const create = (req, res) => {
  const reply = new Reply({
    intent: req.body.intent,
    botId: req.body.botId,
    replyMessage: req.body.replyMessage,
  });

  reply.save((err, reply) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      intent: reply.intent,
      botId: reply.botId,
      replyMessage: reply.replyMessage,
    });
  });
};
