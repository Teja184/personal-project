from flask_restx import fields
from app.extensions import api

login_model = api.model(
    "Login",
    {
        "username": fields.String(required=True, description="Your username"),
        "password": fields.String(required=True, description="Your password"),
    },
)


register_model = api.model(
    "Register",
    {
        "username": fields.String(required=True, description="Your username"),
        "password": fields.String(required=True, description="Your email"),
        "email": fields.String(required=True, description="password"),
    },
)
