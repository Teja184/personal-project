from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_restx import Api

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
cors = CORS(origins="http://localhost:5173")
api = Api(
    prefix="/api",
    version="1.0",
    title="Expense and Invetory management API",
)
