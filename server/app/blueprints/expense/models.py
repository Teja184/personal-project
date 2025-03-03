from app.extensions import db
from sqlalchemy.orm import mapped_column
from sqlalchemy import (
    Integer,
    String,
    ForeignKey,
    DECIMAL,
    TIMESTAMP,
    func,
)


class Expense(db.Model):
    __tablename__ = "expenses"

    def to_dict(self):
        return {
            "id": self.expense_id,
            "product_id": self.product_id,
            "product_title": self.product_title,
            "unit_price": self.unit_price,
            "purchace_unit": self.purchace_unit,
            "total_price": self.total_price,
            "purchace_date": self.purchace_date,
            "vendor": self.vendor,
        }

    # product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    expense_id = mapped_column(Integer, primary_key=True)
    product_id = mapped_column(ForeignKey("products.product_id", ondelete="CASCADE"))
    # product_title VARCHAR(255) NOT NULL,
    product_title = mapped_column(String(100), nullable=False)
    # unit_price DECIMAL(10, 2) NOT NULL,
    unit_price = mapped_column(DECIMAL(10, 2), nullable=False)
    # purchase_unit DECIMAL(10, 2) NOT NULL,
    purchace_unit = mapped_column(DECIMAL(10, 2), nullable=False)
    # total_price DECIMAL(10, 2) GENERATED ALWAYS AS (unit_price * purchase_unit) STORED,
    total_price = mapped_column(
        DECIMAL(10, 2), server_default="unit_price * purchace_unit"
    )
    # purchase_date DATE NOT NULL,
    purchace_date = mapped_column(TIMESTAMP(timezone=True), default=func.now())
    # vendor VARCHAR(255),
    vendor = mapped_column(String(100), nullable=False)
    # bill_image VARCHAR(255)
    # bill_image = mapped_column(String)
