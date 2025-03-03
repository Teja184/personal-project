from flask_restx import fields
from app.extensions import api


invetory_model = api.model(
    "Inventory",
    {
        "invetory_id": fields.Integer,
        "product_id": fields.Integer,
        "current_stock": fields.Integer,
        "last_updated": fields.String,
    },
)
