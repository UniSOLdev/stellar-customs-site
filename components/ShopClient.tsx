"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SHOP_PRODUCTS } from "@/lib/shop-data";
import { formatUsd } from "@/lib/stripe-placeholder";
import { parsePriceToNumber } from "@/lib/price";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import type { ProductRow } from "@/lib/db/types";

function ProductCardStatic({ product }: { product: (typeof SHOP_PRODUCTS)[number] }) {
  const { addItem } = useCart();

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-stellar-surface to-stellar-black ring-1 ring-stellar-blue/10"
    >
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.placeholderClass}`}>
        <div className="absolute inset-0 bg-black/25" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-200 backdrop-blur-sm">
          Image placeholder
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-white">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm text-zinc-400">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-xl font-bold text-stellar-blue">{formatUsd(product.price)}</p>
          <button
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
              })
            }
            className="rounded-full border border-stellar-blue/40 bg-stellar-blue/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stellar-blue shadow-glow-button transition hover:bg-stellar-blue/20"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductCardDb({ product }: { product: ProductRow }) {
  const { addItem } = useCart();
  const priceNum = parsePriceToNumber(product.price ?? "0");
  const display = product.price?.trim() ? product.price : formatUsd(priceNum);

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-stellar-surface to-stellar-black ring-1 ring-stellar-blue/10"
    >
      <div className="relative aspect-[4/3] bg-zinc-900">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-stellar-blue/20 p-4 text-center text-xs text-zinc-400">
            Add a photo in Admin
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm text-zinc-400">{product.description ?? ""}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-xl font-bold text-stellar-blue">{display}</p>
          <button
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                title: product.name,
                price: priceNum > 0 ? priceNum : 0,
              })
            }
            className="rounded-full border border-stellar-blue/40 bg-stellar-blue/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stellar-blue shadow-glow-button transition hover:bg-stellar-blue/20"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type Props = {
  dbProducts: ProductRow[];
};

export function ShopClient({ dbProducts }: Props) {
  const { items, count, clear } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const useLive = dbProducts.length > 0;
  const dropship = SHOP_PRODUCTS.filter((p) => p.section === "dropship");
  const local = SHOP_PRODUCTS.filter((p) => p.section === "local");

  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stellar-blue">Shop</p>
            <h1 className="font-display mt-2 text-4xl font-bold text-white sm:text-5xl">Stellar Customs</h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              {useLive
                ? "Live inventory from your dashboard — pair with Stripe checkout when you are ready."
                : "Drop-ship merch and local install products — cart & checkout are scaffolded for Stripe when you wire keys."}
            </p>
          </div>

          <aside className="w-full max-w-sm rounded-2xl border border-stellar-blue/20 bg-stellar-surface/70 p-5 shadow-glow-blue/30 backdrop-blur-md lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Cart</h2>
              <span className="text-xs text-zinc-500">{count} items</span>
            </div>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">Your cart is empty.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((line) => (
                  <li key={line.id} className="flex justify-between gap-2 text-zinc-300">
                    <span>
                      {line.title}
                      {line.qty > 1 ? ` ×${line.qty}` : ""}
                    </span>
                    <span className="shrink-0 text-stellar-blue">{formatUsd(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 border-t border-white/5 pt-4 text-sm">
              <div className="flex justify-between font-semibold text-white">
                <span>Subtotal</span>
                <span>{formatUsd(subtotal)}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/shop/checkout"
                className="block rounded-full bg-gradient-to-r from-stellar-blue-deep to-stellar-blue py-3 text-center text-xs font-bold uppercase tracking-widest text-black shadow-glow-button"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={clear}
                className="text-center text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-stellar-orange"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>

        {useLive ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white">Shop catalog</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-500">Managed in Admin → Products.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dbProducts.map((p) => (
                <ProductCardDb key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-white">Drop Ship Merch</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                Hoodie, tee, hat, stickers — connect your POD provider (Printful, SPOD, etc.).
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dropship.map((p) => (
                  <ProductCardStatic key={p.id} product={p} />
                ))}
              </div>
            </section>

            <section className="mt-20 border-t border-white/5 pt-16">
              <h2 className="font-display text-2xl font-bold text-white">Local Products</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                Starlight kits, LED interior kits, and installation packages — inventory-aware when you add a backend.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {local.map((p) => (
                  <ProductCardStatic key={p.id} product={p} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
