from flask_restx import fields

from app.extensions import api


category_model = api.model(
    "Cateogry",
    {
        "id": fields.Integer,
        "category_name": fields.String,
    },
)
