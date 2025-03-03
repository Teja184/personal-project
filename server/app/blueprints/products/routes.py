from flask import request, jsonify
from app.extensions import db
from app.blueprints.products.models import Product
from app.blueprints.category.models import Category
from app.blueprints.inventory.models import Inventory
from sqlalchemy import select, delete, update
from flask_login import login_required
from flask_cors import cross_origin
from flask_restx import Resource, Namespace
from flask_restx._http import HTTPStatus
from app.blueprints.products.api_models import product_model


# product_bp = Blueprint("product", __name__, template_folder="templates")
product_ns = Namespace("product", description="Contains Products")


# product
# GET /products: Fetch all products.
# POST /products: Add a new product.
@product_ns.route("")
# @login_required
# @cross_origin(origins="*", supports_credentials=True)
class ProductList(Resource):
    @cross_origin(supports_credentials=True)
    def options(self):
        return "", HTTPStatus.OK

    @cross_origin(origins="*", supports_credentials=True)
    @product_ns.expect(
        product_model, code=HTTPStatus.CREATED, description="Add new product"
    )
    # @login_required
    def post(self):
        """Add new product"""
        data = request.json
        pname = data.get("product_name")
        unit_of_measure = data.get("unit_of_measure")
        category_id = data.get("cat_id")
        active_status = data.get("active_status")

        # check category exists or
        cat_query = select(Category).where(Category.category_id == category_id)
        print(cat_query)
        rslt = db.session.execute(cat_query).fetchone()
        if not rslt:
            return {"error": "invaild category"}, 403

        prd = Product(
            product_name=pname,
            unit_of_measure=unit_of_measure,
            category_id=category_id,
            active_status=active_status,
        )
        db.session.add(prd)
        db.session.flush()

        inv = Inventory(product_id=prd.product_id)
        db.session.add(inv)
        db.session.commit()
        return prd.to_dict()

    @cross_origin(origins="*", supports_credentials=True)
    @product_ns.marshal_with(
        product_model, code=HTTPStatus.OK, description="Get all products"
    )
    # @login_required
    def get(self):
        "Get all products"
        page = request.args.get("page", "")
        per_page = 10
        if not page and not page.strip().isdigit():
            page = 1
        else:
            page = int(page)

        search = request.args.get("search", "")
        category_id = request.args.get("category", "")
        active_status = request.args.get("status", "0").strip()

        query = select(Product)

        if search:
            query = query.where(Product.product_name.contains(search))

        if category_id:
            query = query.where(Product.category_id == category_id)

        if active_status == "1":
            query = query.where(Product.active_status == True)

        prds = db.session.execute(query).scalars()
        return [prd.to_dict() for prd in prds]


# PUT /products/{product_id}: Update product details
@product_ns.route("/<int:product_id>")
# @login_required
class ProductResourse(Resource):
    @cross_origin(origins="*", supports_credentials=True)
    @product_ns.marshal_with(
        product_model, code=HTTPStatus.OK, description="Update product by id"
    )
    # @login_required
    def put(self, product_id):
        """Update product by {id}"""
        data = request.json
        pname = data.get("product_name")
        unit_of_measure = data.get("unit_of_measure")
        category_id = data.get("cat_id")
        active_status = data.get("active_status")
        db.session.execute(
            update(Product)
            .where(Product.product_id == product_id)
            .values(
                product_name=pname,
                unit_of_measure=unit_of_measure,
                category_id=category_id,
                active_status=active_status,
            )
        )
        db.session.commit()
        return "update product"

    @cross_origin(origins="*", supports_credentials=True)
    @product_ns.marshal_with(
        product_model, code=HTTPStatus.OK, description="Delete product by id"
    )
    # @login_required
    def delete(self, product_id):
        "Delete Product by {id}"
        db.session.execute(delete(Product).where(Product.product_id == product_id))
        db.session.commit()
        return "delete proudct"
