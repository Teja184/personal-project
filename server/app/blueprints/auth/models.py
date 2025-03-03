from app.extensions import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import String, Integer
from flask_login import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = "user"

    def get_id(self):
        try:
            return str(self.user_id)
        except AttributeError:
            raise NotImplementedError("No `id` attribute - override `get_id`") from None

    def get_id(self):
        try:
            return str(self.user_id)
        except AttributeError:
            raise NotImplementedError("No `id` attribute - override `get_id`") from None

    def to_dict(self):
        return {
            "uid": self.user_id,
            "username": self.name,
            "email": self.mail,
        }

    user_id = mapped_column(Integer, primary_key=True)
    name = mapped_column(
        String(50),
        nullable=False,
        unique=True,
    )
    mail = mapped_column(String(70), nullable=False, unique=True)
    password = mapped_column(String, nullable=False)
