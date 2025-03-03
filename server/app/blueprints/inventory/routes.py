from flask_restx import Namespace, Resource
from flask_restx._http import HTTPStatus
from flask import request
from flask_cors import cross_origin
from sqlalchemy import update,select
from app.blueprints.products.models import Product
from app.blueprints.category.models import Category
from app.extensions import db
from .models import Inventory
from .api_models import invetory_model

inventory_ns = Namespace("inventory", description="Invetory items")


# inventory management
# GET /inventory: Fetch current inventory levels.
# POST /inventory: Add or update stock levels.
@inventory_ns.route("/<int:invetory_id>")
class InventoryResource(Resource):
    @cross_origin(origins="*", supports_credentials=True)
    @inventory_ns.marshal_with(
        invetory_model, code=HTTPStatus.OK, description="Get inventory item by id"
    )
    def get(self, invetory_id):
        """Get invetory item by {id}"""
        data = request.json
        current_stock = data.get("current_stock")
        db.session.execute(
            update(Inventory)
            .where(Inventory.invetory_id == invetory_id)
            .values(current_stock=current_stock)
        )
        db.session.commit()
        return "updated current stock"


@inventory_ns.route("")
class InventoryList(Resource):
    @cross_origin(origins="*", supports_credentials=True)
    @inventory_ns.marshal_with(
        invetory_model,
        code=HTTPStatus.OK,
        description="Get all inventory items",
        as_list=True,
    )
    def get(self):
        """Get inventory items"""
        query = (select(Inventory, Product.product_name, Category.category_name).join(Product, Inventory.product_id == Product.product_id).join(Category, Product.category_id == Category.category_id))

        rslt = db.session.execute(query).all()
        return [inv.to_dict(product_name=product_name,category_name=category_name) for inv,product_name, category_name in rslt]
