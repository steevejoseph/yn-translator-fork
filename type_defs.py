class ChatData:
    content: str
    role: str
    gpt_response: str
    created_at: str
    user_ref: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __str__(self):
        return f"MyClass({', '.join(f'{key}={value}' for key, value in self.__dict__.items())})"
