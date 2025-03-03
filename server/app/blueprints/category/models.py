from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import Integer, String

from app.extensions import db


class Category(db.Model):
    __tablename__ = "categories"

    def to_dict(self):
        return {"id": self.category_id, "category_name": self.category_name}

    category_id = mapped_column(Integer, primary_key=True)
    category_name = mapped_column(String(50), nullable=False, unique=True)

    products = relationship("Product", back_populates="category")
