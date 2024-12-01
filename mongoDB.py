import datetime
from mongoengine import *
import os
from pymongo import MongoClient

from type_defs import ChatData
from dotenv import load_dotenv

load_dotenv()

uri = os.environ.get("DB_CONN_STRING")
connect(host=uri)
client = MongoClient(uri)


class Chat(Document):
    content = StringField(required=True)
    role = StringField()
    gpt_response = StringField()
    created_at = DateTimeField()
    user_ref = ReferenceField("User")


class User(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)


def add_chat(data: ChatData):
    chat = Chat(
        content=data.content,
        role=data.role,
        gpt_response=data.gpt_response,
        created_at=datetime.datetime.now(),
    )
    chat.save()
