from flask_restx import Namespace, Resource
from flask_restx._http import HTTPStatus
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin
from flask import request, jsonify

from app.extensions import db
from .models import Category
from .api_models import category_model


category_ns = Namespace("category",description="Contains Categories")


@category_ns.route("")
class CateogoryList(Resource):
    # @login_required
    @cross_origin(origins="*", supports_credentials=True)
    @category_ns.marshal_with(category_model, code=HTTPStatus.OK, as_list=True,description="Get categories")
    def get(self):
        """Get all categories"""
        # query, execute
        rslt = [
            cat.to_dict()
            for cat in db.session.scalars(
                select(Category).order_by(Category.category_id)
            ).all()
        ]

        return rslt

    @cross_origin(origins="*", supports_credentials=True)
    @category_ns.marshal_with(category_model, code=HTTPStatus.CREATED,description="Add new category")
    def post(self):
        """Add new category"""
        data = request.json
        cat_name = data.get("name")
        if not cat_name:
            return "invalid json payload", 400
        try:
            ctg = Category(category_name=cat_name)
            db.session.add(ctg)
            db.session.commit()

            resp = ctg.to_dict()
            resp.status_code = 201
        except IntegrityError as ie:
            if ie.statement.find("UNIQUE constraint failed"):
                return "category alread exists", 403
        except Exception:
            return "failed to add", 500

        return resp
