from flask import Flask
from app.extensions import db, migrate, login_manager, cors, api
import config as config
from app.blueprints.auth.models import User


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)
    login_manager.init_app(app)
    api.init_app(app)

    from app.blueprints.products.routes import product_ns
    from app.blueprints.auth.routes import auth_ns
    from app.blueprints.expense.routes import expense_ns
    from app.blueprints.inventory.routes import inventory_ns
    from app.blueprints.category.routes import category_ns

    api.add_namespace(category_ns, path="/category")
    api.add_namespace(product_ns, path="/products")
    api.add_namespace(expense_ns, path="/expenses")
    api.add_namespace(inventory_ns, path="/inventory")
    api.add_namespace(auth_ns, path="/auth")

    with app.app_context():
        db.create_all()

    return app
