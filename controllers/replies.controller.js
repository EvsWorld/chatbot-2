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
  // TODO: queries by just intent if theres no botId. I assume the botId would
  // be a client identifier.  So we can send the botId and then have custom
  // responses for different companies. But we'll leave botId optional for now
  const query = botId ? { intent, botId } : { intent };

  Reply.findOne(query).exec((err, reply) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!reply) {
      return res.status(404).send({ message: 'reply Not found.' });
    }

    res.status(200).send({ reply });
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
