import os
import smtplib
from email.message import EmailMessage

SEND_EMAIL_PASSWORD = os.environ.get("SEND_EMAIL_PASSWORD")
SEND_EMAIL_SENDER = os.environ.get("SEND_EMAIL_SENDER")
SEND_EMAIL_GETTER = os.environ.get("SEND_EMAIL_GETTER")

if not SEND_EMAIL_PASSWORD or not SEND_EMAIL_SENDER or not SEND_EMAIL_GETTER:
    print("No env vars for email")
    # raise ImportError("Set email info in env vars")

def send_email(cc:str, content:str):
    email_msg = EmailMessage()
    email_msg["Subject"]= "New Contact Email Received"
    email_msg.set_content(content)

    gmail = smtplib.SMTP("smtp.gmail.com",587)
    gmail.ehlo()
    gmail.starttls()
    gmail.login(SEND_EMAIL_SENDER, SEND_EMAIL_PASSWORD)
    
    toaddrs = [SEND_EMAIL_GETTER, cc]
    gmail.sendmail(SEND_EMAIL_SENDER,toaddrs,email_msg.as_string())
    gmail.quit()
