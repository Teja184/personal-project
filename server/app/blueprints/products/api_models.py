from flask_restx import fields

from app.extensions import api


product_model = api.model(
    "Product",
    {
        "id": fields.Integer,
        "name": fields.String,
        "u_o_m": fields.String,
        "category": fields.String,
    },
)
