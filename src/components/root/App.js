import React from "react";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <div>
      <Container>
        <Navi></Navi>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/product"  component={Dashboard} />
          <Route path="/saveproduct/:productId"  component={AddOrUpdateProduct} />
          <Route path="/saveproduct"  component={AddOrUpdateProduct} />
          <Route path="/cart"  component={CartDetail} />
          <Route  exact component={NotFound} />

        </Switch>

      </Container>
    </div>
  );
}

export default App;
