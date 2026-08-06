# FakeStore App

A React + Vite app for browsing, creating, editing, and deleting products via the [Fake Store API](https://fakestoreapi.com).

## Features

- Browse a product listing with details for each item
- View a single product's details
- Add a new product
- Edit an existing product
- Delete a product
- Bootstrap-based UI (via `react-bootstrap`)

## Tech Stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [React Bootstrap](https://react-bootstrap.github.io)

## Project Structure

```
src/
  components/       Reusable UI components (Navbar, ProductCard, LoadingSpinner, ErrorMessage)
  pages/            Route-level pages (Home, ProductListing, ProductDetails, AddProduct, EditProduct)
  services/         API layer (productService.js — Axios calls to fakestoreapi.com)
  App.jsx           Route definitions
```

## Routes

| Path                    | Page            |
| ------------------------ | --------------- |
| `/`                       | Home            |
| `/product-listing`        | ProductListing  |
| `/product-details/:id`    | ProductDetails  |
| `/add-product`            | AddProduct      |
| `/edit-product/:id`       | EditProduct     |

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## API

All product data is read from and written to the public [Fake Store API](https://fakestoreapi.com). Note that write operations (create/update/delete) are simulated by the API and do not persist changes server-side.
