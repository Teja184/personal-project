from flask_restx import Namespace, Resource
from flask_restx._http import HTTPStatus
from flask import request
from flask_cors import cross_origin
from sqlalchemy import update,select
from app.blueprints.products.models import Product
from app.extensions import db
from .models import Inventory
from .api_models import invetory_model

inventory_ns = Namespace("inventory", description="Invetory items")


# inventory management
# GET /inventory: Fetch current inventory levels.
# POST /inventory: Add or update stock levels.
@inventory_ns.route("/<int:invetory_id>")
class InventoryResource(Resource):
    @cross_origin(supports_credentials=True)
    def options(self):
        return "", HTTPStatus.OK
    
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
    @cross_origin(supports_credentials=True)
    def options(self):
        return "", HTTPStatus.OK
    
    @cross_origin(origins="*", supports_credentials=True)
    @inventory_ns.marshal_with(
        invetory_model,
        code=HTTPStatus.OK,
        description="Get all inventory items",
        as_list=True,
    )
    def get(self):
        """Get inventory items"""
        search = request.args.get("search")
        category_id = request.args.get("category", "")
        active_status = request.args.get("status", "0").strip()
        query = select(Inventory)
        if search:
            query = query.join(Product, Inventory.product_id == Product.product_id).where(Product.product_name.contains(search))

        if category_id:
            query = query.join(Product,Inventory.product_id == Product.product_id).where(Product.category_id == category_id)
        
        if active_status == "1":
            query = query.where(Product.active_status == True)

        rslt = db.session.execute(query).scalars()
        result = [inv.to_dict() for inv in rslt]

        return result

