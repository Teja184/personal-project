from flask_restx import Namespace, Resource
from flask_restx._http import HTTPStatus
from flask import Response, request,jsonify
from flask_cors import cross_origin
from sqlalchemy import select
from flask_login import login_required

from .models import Expense
from app.blueprints.products.models import Product
from app.extensions import db
from .api_model import expense_model

expense_ns = Namespace("expense",description="Contains Expense")


# /api/expense/
# GET /expenses: Fetch all expenses.
# GET -> /expenses?date=&category=disposables&vendor=vendor1&search
# GET -> /expenses?search=maidha
# GET -> /expenses?date=
# GET -> /expenses?category=disposal&vendor=vendor 2
# POST /expenses: Add a new expense.
@expense_ns.route("")
class ExpenseList(Resource):
    #method_decorators = [login_required]

    @cross_origin(origins="*", supports_credentials=True)
    @expense_ns.marshal_with(
        expense_model, code=HTTPStatus.CREATED, description="Expense created"
    )
    def post(self) -> Response:
        """Create a new expense"""

        if not request.is_json:
            return Response(response=b"invalid data", status=HTTPStatus.BAD_REQUEST)

        data = request.json
        product_id = data.get("product_id")
        product_title = data.get("product_title")
        unit_price = data.get("unit_price")
        purchace_unit = data.get("p_unit")
        vendor = data.get("vendor")

        # check product exists or not
        pro_query = select(Product).where(Product.product_id == product_id)
        rslt = db.session.execute(pro_query).fetchone()
        if not rslt:
            resp = jsonify({"error": "invaild product"})
            resp.status_code = 403
            return resp

        exp = Expense(
            product_title=product_title,
            purchace_unit=purchace_unit,
            product_id=product_id,
            unit_price=unit_price,
            vendor=vendor,
            total_price=unit_price * purchace_unit,
        )
        db.session.add(exp)
        db.session.commit()

        resp = jsonify(exp.to_dict())
        resp.status_code = 201
        return resp

    @cross_origin(origins="*", supports_credentials=True)
    @expense_ns.marshal_with(
        expense_model,
        code=HTTPStatus.OK,
        description="Get list of expenses",
        as_list=True,
    )
    def get(self) -> Response:
        """Get all expenses"""
        page = request.args.get("page", "")
        per_page = 10
        if not page and not page.strip().isdigit():
            page = 1
        else:
            page = int(page)

        date = request.args.get("dateRange", "")  # 13-march-2024 - 14-april-2024
        search = request.args.get("search", "")
        category = request.args.get("category", "")
        vendor = request.args.get("vendor", "")

        query = select(Expense)

        if search:
            query = query.where(Expense.product_title.contains(search))

        if category and category.isdigit():
            query = query.join(
                Product, Expense.product_id == Product.product_id
            ).filter(Product.category_id == int(category))

        if date and date.get("from") and date.get("to"):
            # query = query.filter(
            #     Expense.purchace_date.between(date.get("from"), date.get("to"))
            # )
            pass

        if vendor:
            query = query.where(Expense.vendor.contains(vendor))

        offset = (page * 10) - per_page
        exps = db.session.execute(
            query.order_by(Expense.expense_id.desc()).limit(per_page).offset(offset)
        ).scalars()
        data = [exp.to_dict() for exp in exps]
        return data


@expense_ns.route("/<int:expense_id>")
class ExpenseResourse(Resource):
    # GET /expenses/{expense_id}: Fetch details of a specific expense.
    @cross_origin(origins="*", supports_credentials=True)
    @expense_ns.marshal_with(expense_model, code=200,description="Get expense by id")
    def get(self, expense_id):
        """Get expense by{id}"""
        exp = db.session.execute(
            select(Expense).where(Expense.expense_id == expense_id)
        ).scalar_one_or_none()
        if exp:
            return exp.to_dict()

        return dict()
