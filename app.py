from flask import Flask, request, jsonify, Response, render_template
from flask_cors import CORS
import json
from openai import OpenAI
import os

from mongoDB import add_chat, add_user
from type_defs import ChatData, UserData


from dotenv import load_dotenv

load_dotenv()


apiKey = os.environ.get("YN_KEY")
client = OpenAI(api_key=apiKey)

app = Flask(__name__)
CORS(app)


@app.route("/")
def handle_home_route():
    return render_template("index.html")


@app.route("/user", methods=["POST"])
def create_user():
    # print(request.get_json())
    u_data = request.get_json()
    u_data_object = UserData(**u_data)
    print(u_data_object)
    add_user(u_data_object)

    res = json.dumps(
        {"message": f"Sucessfully added user", "original_content": json.dumps(u_data)}
    )

    return Response(res, status=200, mimetype="application/json")

    return "OK"


@app.route("/chat", methods=["POST"])
def post_to_open_api():
    data = request.get_json()
    print("data:", data)

    content = data.get("content")
    role = data.get("role") or "helpful assistant"

    if content == None:
        response = json.dumps({"message": "Please give me json with `content`"})
        return Response(response, status=400)

    print(f"type(content): {type(content)}")

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"Speak as if you are a {role}."},
            {"role": "user", "content": content},
        ],
        max_tokens=100,
    )

    gpt_response = completion.choices[0].message.content

    chat_data = {"content": content, "role": role, "gpt_response": gpt_response}

    chat_data_object = ChatData(**chat_data)

    print(f"obj: {chat_data_object}")
    print("Im printing :", chat_data)
    add_chat(chat_data_object)

    res = json.dumps({"message": gpt_response, "original_content": content})

    return Response(res, status=200, mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
