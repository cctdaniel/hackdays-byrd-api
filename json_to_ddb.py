import json
from decimal import Decimal

import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('hackdays-byrd')

# Read the JSON file
with open('hackdays-byrd.json') as json_data:
    items = json.load(json_data, parse_float=Decimal)

    with table.batch_writer() as batch:

        # Loop through the JSON objects
        for item in items:
            batch.put_item(Item=item)
