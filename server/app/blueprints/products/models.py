from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import (
    Integer,
    String,
    Boolean,
    ForeignKey,
)
from app.extensions import db


class Product(db.Model):
    __tablename__ = "products"

    def to_dict(self):
        return {
            "id": self.product_id,
            "name": self.product_name,
            "u_o_m": self.unit_of_measure,
            "category": self.category_id,
        }

    product_id = mapped_column(Integer, primary_key=True)
    product_name = mapped_column(String(200), nullable=False)
    unit_of_measure = mapped_column(String(100), nullable=False)
    active_status = mapped_column(Boolean, default=True, nullable=False)
    category_id = mapped_column(ForeignKey("categories.category_id"))

    category = relationship("Category", back_populates="products")
    inventory = relationship("Inventory", back_populates="product")