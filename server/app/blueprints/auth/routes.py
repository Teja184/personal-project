from flask import Blueprint, request, jsonify
from app.blueprints.auth.models import User
from app.http_errors import bad_request_error, unauthorized_erroor
from app import db
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from flask_login import login_user
from flask_restx import Namespace, Resource

from app.utils import generate_hashpwd, check_hashpwd
from .api_models import login_model, register_model

# auth_bp = Blueprint("auth", __name__, template_folder="templates")
auth_ns = Namespace("auth",description="User Authorization")
ERRORS = {
    "UNIQUE constraint failed: user.mail": "mail id is already register",
    "UNIQUE constraint failed: user.name": "name is already register",
}


@auth_ns.route("/login")
class AuthResource(Resource):
    @auth_ns.expect(login_model)
    @auth_ns.response(201, "user login")
    def post(self):
        """User login"""
        data = request.json
        # data validation
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        if not username and not password:
            return bad_request_error()
        # check user exists
        query = select(User).where(User.name == username)

        user = db.session.execute(query).scalar_one_or_none()
        if not user:
            return unauthorized_erroor()
        # abc1123, dfksdf@#SDfksjdkf;asdfSDfkjkasd;fasdf
        if not check_hashpwd(password, user.password):
            print("password invalid")
            return unauthorized_erroor()

        login_user(user)

        resp = jsonify(user.to_dict())
        return resp


@auth_ns.route("/register")
class RegisterResource(Resource):
    @auth_ns.expect(register_model)
    @auth_ns.response(201, "new user created")
    def post(self):
        """User registerd"""
        data = request.json
        # data validation
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        mail = data.get("email", "").strip()

        if not username and not password and not mail:
            return bad_request_error(body="invlaid form data")

        hash = generate_hashpwd(password)
        try:
            user = User(name=username, password=hash, mail=mail)
            db.session.add(user)
            db.session.commit()

        except IntegrityError as e:
            return ERRORS.get(e.orig.args[0], "unauthorized"), 400

        resp = jsonify(user.to_dict())
        resp.status_code = 201

        return resp
