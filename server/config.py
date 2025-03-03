class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///project.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "very strong secret"


class DevConfig:
    pass


class ProdConfig:
    pass
