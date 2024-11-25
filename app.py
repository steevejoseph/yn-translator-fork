from flask import Flask, request, jsonify, Response, render_template
from openai import OpenAI
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()
import os

apiKey = os.environ.get("YN_KEY")

client = OpenAI(api_key=apiKey)
import json
app = Flask(__name__)
CORS(app)

@app.route("/")
def handle_home_route():
    return render_template("index.html")

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
            {
                "role": "user",
                "content": content
            }
        ],
        max_tokens=100
    )

    gpt_response = completion.choices[0].message.content

    res = json.dumps({ 
                      "message": gpt_response, 
                      "original_content": content
                    }) 
    
    return Response(res, status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
