from sqlalchemy.orm import mapped_column,relationship
from sqlalchemy import (
    Integer,
    ForeignKey,
    DECIMAL,
    func,
    DateTime,
)

from app.extensions import db


class Inventory(db.Model):
    __tablename__ = "inventory"

    def to_dict(self,product_name=None, category_name=None):
        return {
            "invetory_id": self.invetory_id,
            "current_stock": self.current_stock,
            "last_updated": self.last_updated ,
            "product_id": self.product.product_id,
            "product": self.product.to_dict(),
            "category": self.product.category.to_dict()
        }

    invetory_id = mapped_column(Integer, primary_key=True)
    product_id = mapped_column(ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
    current_stock = mapped_column(DECIMAL, default=0)
    last_updated = mapped_column(DateTime(timezone=True), onupdate=func.now(), default=func.now())

    product = relationship("Product", back_populates="inventory")
