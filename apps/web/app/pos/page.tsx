"use client";

import { useMemo, useState } from "react";
import { Coffee, Cookie, CupSoda, Droplets, Popcorn, Soup } from "lucide-react";
import "./pos.css";

type Category = "All" | "Drinks" | "Snacks" | "Pantry";
type Product = {
  id: number;
  name: string;
  description: string;
  category: Exclude<Category, "All">;
  icon: string;
  price: number;
};

const productIcons = {
  cola: CupSoda,
  water: Droplets,
  coffee: Coffee,
  noodles: Soup,
  chips: Popcorn,
  biscuits: Cookie,
};

const products: Product[] = [
  {
    id: 1,
    name: "Cola",
    description: "Chilled 330ml bottle",
    category: "Drinks",
    icon: "cola",
    price: 25,
  },
  {
    id: 2,
    name: "Bottled water",
    description: "Purified 500ml bottle",
    category: "Drinks",
    icon: "water",
    price: 20,
  },
  {
    id: 3,
    name: "Coffee sachet",
    description: "3-in-1 instant coffee",
    category: "Pantry",
    icon: "coffee",
    price: 8,
  },
  {
    id: 4,
    name: "Instant noodles",
    description: "Quick-cook noodle pack",
    category: "Pantry",
    icon: "noodles",
    price: 18,
  },
  {
    id: 5,
    name: "Potato chips",
    description: "Classic salted snack pack",
    category: "Snacks",
    icon: "chips",
    price: 20,
  },
  {
    id: 6,
    name: "Biscuits",
    description: "Sweet snack pack",
    category: "Snacks",
    icon: "biscuits",
    price: 12,
  },
];

export default function PosPage() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          category === "All" || product.category === category;
        return (
          matchesCategory &&
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      }),
    [category, query],
  );

  const cartItems = products.filter((product) => cart[product.id]);
  const total = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  );
  const itemCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  function addProduct(product: Product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
    setNotice(`${product.name} added`);
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + delta;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  }

  function completeSale() {
    if (!itemCount) return;
    setCart({});
    setShowCart(false);
    setNotice("Sale saved successfully");
  }

  return (
    <main className="pos-page">
      <header className="pos-header">
        <a className="pos-brand" href="/">
          SariStore
        </a>
        <div>
          <span className="sync-status">● Online</span>
          <button className="pos-menu" type="button">
            Menu
          </button>
        </div>
      </header>
      <div className="pos-workspace">
        <aside className="pos-sidebar" aria-label="Store navigation">
          <div className="sidebar-section">
            <p className="sidebar-label">Workspace</p>
            <a className="sidebar-link is-active" href="/pos">
              ⌂ <span>POS</span>
            </a>
            <a className="sidebar-link" href="#">
              ▦ <span>Orders</span>
            </a>
            <a className="sidebar-link" href="#">
              ◫ <span>Products</span>
            </a>
            <a className="sidebar-link" href="#">
              ◒ <span>Inventory</span>
            </a>
          </div>
          <div className="sidebar-section">
            <p className="sidebar-label">Store</p>
            <a className="sidebar-link" href="#">
              ₱ <span>Expenses</span>
            </a>
            <a className="sidebar-link" href="#">
              ◉ <span>Customers</span>
            </a>
            <a className="sidebar-link" href="#">
              ▤ <span>Reports</span>
            </a>
          </div>
          <div className="sidebar-bottom">
            <a className="sidebar-link" href="#">
              ◌ <span>Settings</span>
            </a>
            <div className="staff-profile">
              <span className="profile-mark">S</span>
              <span>
                <strong>Demo Staff</strong>
                <small>Staff account</small>
              </span>
            </div>
          </div>
        </aside>
        <div className="pos-layout">
          <section className="catalog-panel" aria-labelledby="catalog-title">
            <div className="catalog-heading">
              <div>
                <p className="pos-eyebrow">Staff checkout</p>
                <h1 id="catalog-title">What are you selling?</h1>
              </div>
              <label className="search-label">
                Search products
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by product name"
                />
              </label>
            </div>
            <div
              className="category-tabs"
              role="tablist"
              aria-label="Product categories"
            >
              {(["All", "Drinks", "Snacks", "Pantry"] as Category[]).map(
                (item) => (
                  <button
                    className={
                      category === item
                        ? "category-tab is-active"
                        : "category-tab"
                    }
                    type="button"
                    role="tab"
                    aria-selected={category === item}
                    key={item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <div className="product-grid" aria-live="polite">
              {visibleProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => addProduct(product)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      addProduct(product);
                    }
                  }}
                >
                  <div
                    className={`product-visual product-visual-${product.icon}`}
                    aria-hidden="true"
                  >
                    <ProductIcon
                      name={product.icon as keyof typeof productIcons}
                    />
                  </div>
                  <div className="product-card-heading">
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-card-copy">
                    <span className="product-name">{product.name}</span>
                    <span className="product-description">
                      {product.description}
                    </span>
                  </div>
                  <div className="product-card-footer">
                    <strong>₱{product.price}</strong>
                    <span className="add-to-order">Add to order</span>
                  </div>
                </article>
              ))}
              {!visibleProducts.length && (
                <p className="empty-products">
                  No products found. Try another search or category.
                </p>
              )}
            </div>
          </section>
          <aside
            className={
              showCart ? "order-panel is-mobile-visible" : "order-panel"
            }
            aria-label="Current order"
          >
            <div className="order-heading">
              <div>
                <p className="pos-eyebrow">Current order</p>
                <h2>
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </h2>
              </div>
              <button
                className="close-cart"
                type="button"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>
            <div className="cart-lines">
              {cartItems.map((product) => (
                <div className="cart-line" key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>₱{product.price} each</span>
                  </div>
                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name}`}
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      −
                    </button>
                    <span>{cart[product.id]}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name}`}
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {!cartItems.length && (
                <p className="empty-cart">
                  Your order is empty. Tap a product to add it.
                </p>
              )}
            </div>
            <div className="order-footer">
              <div className="total-row">
                <span>Total</span>
                <strong>₱{total}</strong>
              </div>
              <button
                className="complete-sale"
                type="button"
                disabled={!itemCount}
                onClick={completeSale}
              >
                Complete sale
              </button>
            </div>
          </aside>
        </div>
      </div>
      <button
        className="mobile-cart-button"
        type="button"
        onClick={() => setShowCart(true)}
      >
        <span>
          View cart · {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
        <strong>₱{total}</strong>
      </button>
      {notice && (
        <button
          className="pos-notice"
          type="button"
          onClick={() => setNotice("")}
          aria-label="Dismiss notice"
        >
          {notice} <span>×</span>
        </button>
      )}
    </main>
  );
}

function ProductIcon({ name }: { name: keyof typeof productIcons }) {
  const Icon = productIcons[name];
  return (
    <Icon
      className="product-icon"
      size={34}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}
