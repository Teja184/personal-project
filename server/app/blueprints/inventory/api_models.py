from flask_restx import fields
from app.extensions import api
from app.blueprints.products.api_models import product_model
from app.blueprints.category.api_models import category_model

invetory_model = api.model(
    "Inventory",
    {
        "invetory_id": fields.Integer,
        "current_stock": fields.Integer,
        "last_updated": fields.String,
        "product": fields.Nested(product_model),
        "category": fields.Nested(category_model),
    },
)
