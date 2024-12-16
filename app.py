from flask import (
    Flask,
    redirect,
    request,
    jsonify,
    Response,
    render_template,
    send_from_directory,
)
from flask_cors import CORS
import json
from openai import OpenAI
import os


from mongoDB import add_chat, add_user
from type_defs import ChatData, UserData


from dotenv import load_dotenv

load_dotenv()

from send_email import send_email 

apiKey = os.environ.get("YN_KEY")
client = OpenAI(api_key=apiKey)

app = Flask(__name__, static_folder="client/dist", static_url_path="/")
CORS(app)


import stripe

stripe_api_key = os.environ.get("STRIPE_API_KEY")

if not stripe_api_key :
    raise ValueError("No Stripe api key found in environ variables :(")

stripe.api_key = stripe_api_key
REACT_URL = "http://localhost:5173"
@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
  session = stripe.checkout.Session.create(
    line_items=[{
      'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': 'Donation',
          "images": ["https://media.licdn.com/dms/image/v2/D4E03AQGBXcircCwpDg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721261093039?e=1739404800&v=beta&t=xsEFaSGzDAPELkrwT-31oTF4fFUkP6Emfjqf7dq5T-4"]
        },
        'unit_amount': 100,
      },
      'quantity': 1, 
    }],
    mode='payment',
    success_url=f'{REACT_URL}/success?session_id={{CHECKOUT_SESSION_ID}}',
    cancel_url=f'{REACT_URL}/cancel',
  )

  return redirect(session.url, code=303)

@app.route('/api/session-status', methods=['GET'])
def session_status():
  session = stripe.checkout.Session.retrieve(request.args.get('session_id'))
  print(session)
  cust_name = session.customer_details.name
  return jsonify(status=session.status, customer_email=session.customer_details.email,session=session, cust_name=cust_name)


@app.route("/api/ping", methods=["GET"])
def handle_ping():
    return Response(json.dumps({"message": "pong"}), status=200)


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
@app.route("/api/contact", methods=["POST"])
def handle_send_email():
  print(f"We're en route:{request.get_json()}")
  data = request.get_json()
  
  fullName = data.get("name")
  message = data.get("message")
  message = f"New contact email from {fullName}: {message}"
  
  send_email(data.get("email"), message)
  response = json.dumps({"message": "OK"})
  return Response(response, status=200, mimetype="application/json")

@app.route("/api/chat", methods=["POST"])
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


# This must be the last route, this is for react router
# i.e. if the user goes to /about, /pricing, /contact, etc.
# they will be redirected to the react app
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
@app.errorhandler(404)
def catch_all(path):
    return app.send_static_file("index.html")


# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def serve_static(path):
#     if path.startswith("api/"):
#         return {"error": "Not Found"}, 404

#     # For the root path or any other path, try to serve the file if it exists
#     try:
#         if path == "":
#             return send_from_directory(app.static_folder, "index.html")
#         if os.path.exists(os.path.join(app.static_folder, path)):
#             return send_from_directory(app.static_folder, path)
#         return send_from_directory(app.static_folder, "index.html")
#     except Exception as e:
#         print(f"Error serving file: {e}")
#         return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
