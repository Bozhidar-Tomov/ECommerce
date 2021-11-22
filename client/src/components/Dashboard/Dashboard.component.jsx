import React, { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

import * as api from "../../api";
import { useHistory } from "react-router";

import "./styles.css";

function Dashboard() {
  const rowRef = useRef(null);
  const tableRef = useRef(null);
  console.log("rendering");
  const history = useHistory();

  const routeChange = (ID) => {
    history.push(`/product/${ID}`);
  };

  async function removeItem() {
    const item = rowRef.current.parentNode.parentNode.id;
    await api
      .removeItemFromCart({ item })
      .then((res) => {
        const rowIndex = rowRef.current.parentElement.parentElement.rowIndex;
        tableRef.current.deleteRow(rowIndex);
        console.log(res.data);
      })
      .catch((error) => <Alert variant='danger'>error {error}</Alert>);
  }

  const Product = (props) => (
    <tr id={props.id}>
      <td className='clickable' onClick={() => routeChange(props.id)}>
        {props.name}
      </td>
      <td className='clickable' onClick={() => routeChange(props.id)}>
        {props.price}
      </td>
      <td>
        <Button variant='outline-danger' onClick={() => removeItem()} ref={rowRef}>
          Remove
        </Button>
      </td>
    </tr>
  );

  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function fetch() {
      console.log("here");
      await api
        .getCart()
        .then((res) => setProducts(res.data))
        .catch((error) => console.log("error", error));
    }
    fetch();
  }, []);

  function productList() {
    console.log(products);
    return products.map((product) => (
      <Product name={product.name} price={product.price} key={product.id} id={product.id} />
    ));
  }

  if (!products) return <div>loading</div>;

  return (
    <Container>
      <Row className='g-3 my-3 justify-content-center'>
        <Col>
          <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
            <p className='fs-5'>Purchases</p>
            <h3 className='fs-2 text-primary'>720</h3>
          </div>
        </Col>
        <Col>
          <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
            <p className='fs-5'>Purchases</p>
            <h3 className='fs-2 text-primary'>720</h3>
          </div>
        </Col>
        <Col>
          <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
            <p className='fs-5 '>Purchases</p>
            <h3 className='fs-2 text-primary'>720</h3>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "10vh" }} className='rounded border border-primary border-2 shadow'>
        <Table hover className='p-0 m-0' ref={tableRef}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{productList()}</tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Dashboard;
