return (
  // <React.Fragment>
  //   <Container className='mt-4'>
  //     <p class='display-3 text-primary text-center'>CHECKOUT</p>

  //     <Row>
  //       <Col lg={8}>
  //         <h2>Billing Address</h2>
  //         <Card className='shadow border-primary p-5 my-3 border-2'>
  //           <Form>
  //             <Row className='mb-3'>
  //               <Form.Group as={Col} controlId='formGridEmail'>
  //                 <Form.Label>Email</Form.Label>
  //                 <Form.Control type='email' placeholder='Enter email' />
  //               </Form.Group>

  //               <Form.Group as={Col} controlId='formGridPassword'>
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type='password' placeholder='Password' />
  //               </Form.Group>
  //             </Row>

  //             <Form.Group className='mb-3' controlId='formGridAddress1'>
  //               <Form.Label>Address</Form.Label>
  //               <Form.Control placeholder='1234 Main St' />
  //             </Form.Group>

  //             <Form.Group className='mb-3' controlId='formGridAddress2'>
  //               <Form.Label>Address 2</Form.Label>
  //               <Form.Control placeholder='Apartment, studio, or floor' />
  //             </Form.Group>

  //             <Row className='mb-3'>
  //               <Form.Group as={Col} controlId='formGridCity'>
  //                 <Form.Label>City</Form.Label>
  //                 <Form.Control />
  //               </Form.Group>

  //               <Form.Group as={Col} controlId='formGridState'>
  //                 <Form.Label>State</Form.Label>
  //                 <Form.Select defaultValue='Choose...'>
  //                   <option>Choose...</option>
  //                   <option>...</option>
  //                 </Form.Select>
  //               </Form.Group>

  //               <Form.Group as={Col} controlId='formGridZip'>
  //                 <Form.Label>Zip</Form.Label>
  //                 <Form.Control />
  //               </Form.Group>
  //             </Row>

  //             <Form.Group className='mb-3' id='formGridCheckbox'>
  //               <Form.Check type='checkbox' label='Agree to Terms and Conditions' />
  //             </Form.Group>
  //           </Form>
  //         </Card>
  //       </Col>
  //       <Col lg={4}>
  //         <h2>Your cart</h2>

  // <Card className='px-2 py-1 my-3 shadow-sm'>
  //   <ul class='list-group list-group-flush'>
  //     <li class='list-group-item'>
  //       <Row>
  //         <Col xl={9}>
  //           <span class='fw-bold'>{data.name}</span>
  //           <br />
  //           <span class='text-muted'>{data.category}</span>
  //         </Col>
  //         <Col xl={3} class='text-end'>
  //           {data.price} BGN
  //         </Col>
  //       </Row>
  //     </li>
  //     <li class='list-group-item text-success'>
  //       <Row>
  //         <Col xl={9} class='fw-bold'>
  //           <span>Promo Code</span>
  //           <br />
  //           <span>NONE</span>
  //         </Col>

  //         <Col xl={3} class='text-end'>
  //           -0.00 BGN
  //         </Col>
  //       </Row>
  //     </li>
  //     <li class='list-group-item'>
  //       <Row>
  //         <Col xl={9} class='fw-bold'>
  //           Total (BGN)
  //         </Col>
  //         <Col xl={3} class='text-end'>
  //           {data.price} BGN
  //         </Col>
  //       </Row>
  //     </li>
  //   </ul>
  // </Card>
  // <Card className='p-2'>
  //   <Form>
  //     <InputGroup>
  //       <Form.Control placeholder='Promo code'></Form.Control>
  //       <Button type='submit' variant='secondary'>
  //         Redeem
  //       </Button>
  //     </InputGroup>
  //   </Form>
  // </Card>
  //       </Col>
  //     </Row>
  //   </Container>
  // <Container>
  //   <Row className='my-4'>
  //     <Col lg={8}>
  //       <h2>Payment</h2>
  //       <Card className='px-2 py-3 my-3 shadow-sm'>
  //         <Row className='justify-content-center'>
  //           <Col>
  //             <Form.Check type='radio' id='VISA'>
  //               <Form.Check.Label>
  //                 <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>
  //                 <Image src={VISA} alt='VISA'></Image>
  //               </Form.Check.Label>
  //             </Form.Check>
  //           </Col>
  //           <Col>
  //             <Form.Check type='radio' id='MASTERCARD'>
  //               <Form.Check.Label>
  //                 <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>

  //                 <Image src={MASTERCARD} alt='MASTERCARD'></Image>
  //               </Form.Check.Label>
  //             </Form.Check>
  //           </Col>
  //           <Col>
  //             <Form.Check type='radio' id='PAYPAL'>
  //               <Form.Check.Label>
  //                 <Form.Check.Input name='payment-methods' type='radio'></Form.Check.Input>

  //                 <Image src={PAYPAL} alt='PayPal'></Image>
  //               </Form.Check.Label>
  //             </Form.Check>
  //           </Col>
  //         </Row>
  //       </Card>
  //     </Col>
  //   </Row>
  // </Container>
  //   <Footer />
  // </React.Fragment>
  <div>
    <div class='col-md-8 order-md-1'>
      <h4 class='mb-3'>Billing address</h4>
      <form class='needs-validation' novalidate>
        <div class='row'>
          <div class='col-md-6 mb-3'>
            <label for='firstName'>First name</label>
            <input
              type='text'
              class='form-control'
              id='firstName'
              placeholder=''
              value=''
              required
            />
            <div class='invalid-feedback'>Valid first name is required.</div>
          </div>
          <div class='col-md-6 mb-3'>
            <label for='lastName'>Last name</label>
            <input
              type='text'
              class='form-control'
              id='lastName'
              placeholder=''
              value=''
              required
            />
            <div class='invalid-feedback'>Valid last name is required.</div>
          </div>
        </div>

        <div class='mb-3'>
          <label for='username'>Username</label>
          <div class='input-group'>
            <div class='input-group-prepend'>
              <span class='input-group-text'>@</span>
            </div>
            <input type='text' class='form-control' id='username' placeholder='Username' required />
            <div class='invalid-feedback' style='width: 100%;'>
              Your username is required.
            </div>
          </div>
        </div>

        <div class='mb-3'>
          <label for='email'>
            Email <span class='text-muted'>(Optional)</span>
          </label>
          <input type='email' class='form-control' id='email' placeholder='you@example.com' />
          <div class='invalid-feedback'>
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class='mb-3'>
          <label for='address'>Address</label>
          <input
            type='text'
            class='form-control'
            id='address'
            placeholder='1234 Main St'
            required
          />
          <div class='invalid-feedback'>Please enter your shipping address.</div>
        </div>

        <div class='mb-3'>
          <label for='address2'>
            Address 2 <span class='text-muted'>(Optional)</span>
          </label>
          <input type='text' class='form-control' id='address2' placeholder='Apartment or suite' />
        </div>

        <div class='row'>
          <div class='col-md-5 mb-3'>
            <label for='country'>Country</label>
            <select class='custom-select d-block w-100' id='country' required>
              <option value=''>Choose...</option>
              <option>United States</option>
            </select>
            <div class='invalid-feedback'>Please select a valid country.</div>
          </div>
          <div class='col-md-4 mb-3'>
            <label for='state'>State</label>
            <select class='custom-select d-block w-100' id='state' required>
              <option value=''>Choose...</option>
              <option>California</option>
            </select>
            <div class='invalid-feedback'>Please provide a valid state.</div>
          </div>
          <div class='col-md-3 mb-3'>
            <label for='zip'>Zip</label>
            <input type='text' class='form-control' id='zip' placeholder='' required />
            <div class='invalid-feedback'>Zip code required.</div>
          </div>
        </div>
        <hr class='mb-4' />
        <div class='custom-control custom-checkbox'>
          <input type='checkbox' class='custom-control-input' id='same-address' />
          <label class='custom-control-label' for='same-address'>
            Shipping address is the same as my billing address
          </label>
        </div>
        <div class='custom-control custom-checkbox'>
          <input type='checkbox' class='custom-control-input' id='save-info' />
          <label class='custom-control-label' for='save-info'>
            Save this information for next time
          </label>
        </div>
        <hr class='mb-4' />

        <h4 class='mb-3'>Payment</h4>

        <div class='d-block my-3'>
          <div class='custom-control custom-radio'>
            <input
              id='credit'
              name='paymentMethod'
              type='radio'
              class='custom-control-input'
              checked
              required
            />
            <label class='custom-control-label' for='credit'>
              Credit card
            </label>
          </div>
          <div class='custom-control custom-radio'>
            <input
              id='debit'
              name='paymentMethod'
              type='radio'
              class='custom-control-input'
              required
            />
            <label class='custom-control-label' for='debit'>
              Debit card
            </label>
          </div>
          <div class='custom-control custom-radio'>
            <input
              id='paypal'
              name='paymentMethod'
              type='radio'
              class='custom-control-input'
              required
            />
            <label class='custom-control-label' for='paypal'>
              Paypal
            </label>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-6 mb-3'>
            <label for='cc-name'>Name on card</label>
            <input type='text' class='form-control' id='cc-name' placeholder='' required />
            <small class='text-muted'>Full name as displayed on card</small>
            <div class='invalid-feedback'>Name on card is required</div>
          </div>
          <div class='col-md-6 mb-3'>
            <label for='cc-number'>Credit card number</label>
            <input type='text' class='form-control' id='cc-number' placeholder='' required />
            <div class='invalid-feedback'>Credit card number is required</div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-3 mb-3'>
            <label for='cc-expiration'>Expiration</label>
            <input type='text' class='form-control' id='cc-expiration' placeholder='' required />
            <div class='invalid-feedback'>Expiration date required</div>
          </div>
          <div class='col-md-3 mb-3'>
            <label for='cc-expiration'>CVV</label>
            <input type='text' class='form-control' id='cc-cvv' placeholder='' required />
            <div class='invalid-feedback'>Security code required</div>
          </div>
        </div>
        <hr class='mb-4' />
        <button class='btn btn-primary btn-lg btn-block' type='submit'>
          Continue to checkout
        </button>
      </form>
    </div>
  </div>
);
