## Some example requests:
### Adding new replies to database:
```
curl --location --request POST 'http://localhost:5001/api/replies' \
--header 'Content-Type: application/json' \
--data-raw '{
  "intent": "Returning order",
  "replyMessage": "I understood you would like to return an order, is that right?",
  "botId": "5f74865056d7bb000fcd39ff"
}'

## Expected response:
{
    "meta": "Successfully created reply, see details in data",
    "data": {
        "intent": "Returning order",
        "botId": "5f74865056d7bb000fcd39ff",
        "replyMessage": "I understood you would like to return an order, is that right?"
    }
}

```

```
curl --location --request DELETE 'http://localhost:5001/api/replies/6050f7b765aacd9d75f2f9a7' \
--data-raw ''

## Expected response:
{
    "meta": "Successfully deleted reply, see details in data",
    "data": {
        "intent": "Returning order",
        "replyMessage": "I understood you would like to return an order, is that right?",
        "botId": "5f74865056d7bb000fcd39ff",
        "_id": "6050f7b765aacd9d75f2f9a7",
        "createdAt": "2021-03-16T18:23:51.725Z",
        "updatedAt": "2021-03-16T18:23:51.725Z",
        "__v": 0
    }
}

```