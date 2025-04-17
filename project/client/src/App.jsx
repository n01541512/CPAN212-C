import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
