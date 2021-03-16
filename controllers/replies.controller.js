import { Reply } from '../models/reply.model';

export const handleGetReplies = (req, res) => {
  const { intent } = req.query;
  if (!intent) {
    return res.status(400).send({
      status: 400,
      meta: 'Request requires intent',
    });
  }
  const query = { intent };

  Reply.findOne(query).exec((err, reply) => {
    if (err) {
      res.status(500).send({
        status: 500,
        meta: err.message || 'Some error occurred while retrieving replies',
      });
      return;
    }

    if (!reply) {
      return res.status(404).send({
        status: 404,
        meta: `Reply not found in server 2 db for intent: ${intent}`,
      });
    }
    res
      .status(200)
      .send({ status: 200, meta: 'found reply for intent', data: reply });
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
      res.status(500).send({ meta: err });
      return;
    }

    res.status(201).send({
      meta: 'Successfully created reply, see details in data',
      data: {
        intent: reply.intent,
        botId: reply.botId,
        replyMessage: reply.replyMessage,
      },
    });
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  const idIsCorrectFormat = () =>
    id && /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(id);

  if (!idIsCorrectFormat()) {
    return res.status(400).send({
      status: 400,
      meta:
        'Request requires id parameter that conforms to: /^(?=[a-f\\d]{24}$)(\\d+[a-f]|[a-f]+\\d)/',
    });
  }
  Reply.findOneAndDelete({ _id: id }, function (err, reply) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!reply) {
      return res.status(404).send({
        message: `The reply you wanted to delete could not be found `,
      });
    }
    res.status(200).send({
      meta: 'Successfully deleted reply, see details in data',
      data: reply,
    });
  });
};
