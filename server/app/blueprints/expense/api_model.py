from flask_restx import fields
from app.extensions import api


expense_model = api.model(
    "Expense",
    {
        "id": fields.Integer,
        "product_id": fields.Integer,
        "product_title": fields.String,
        "unit_price": fields.Float,
        "purchace_unit": fields.Integer,
        "total_price": fields.Float,
        "purchace_date": fields.String,
        "vendor": fields.String,
    },
)
