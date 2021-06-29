import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container,Row,Col,Button,Form,InputGroup,FormControl } from 'react-bootstrap';
import ReactTable  from "react-table"
import treeTableHOC from "react-table/lib/hoc/treeTable"

import { toast ,Flip,ToastContainer} from "react-toastify"
import axios from 'axios';

import '../styles/components/Orders.css';
import "react-toastify/dist/ReactToastify.css"


const TreeTable = treeTableHOC(ReactTable)

const EditProducts = ({ products }) => {

  const  {id} = products.match.params
  

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStatus, setProductStatus] = useState("");

  const headers = {
      
    'Access-Control-Allow-Origin':'*' ,  
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  useEffect(() => { 

    axios.post('http://localhost:8080/api/products/product',  {id} ,{crossdomain: true,
    mode:"cors", headers}
      
    ).then((response) => {  
    
      setProductName(response.data.name)
      setProductCategory(response.data.category)
      setProductPrice(response.data.price)
      setProductStatus(response.data.status)
    })
    .catch((error) => {      
     
      toast.error( `Error saving data, Validate your internet connection.${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        transition: Flip
      })
    });


  }, []);


  const saveData = () => {
   
    const object={

       name:productName,
       category:productCategory,
       price: productPrice,
       status: productStatus,
       id

    }

   
    

    
    axios.put('http://localhost:8080/api/products',  object ,{crossdomain: true,
    mode:"cors", headers}
      
    ).then((response) => {  
     
      toast.success("The data has been saved successfully.", {
        position: toast.POSITION.TOP_RIGHT,
        transition: Flip
      }) 
    })
    .catch((error) => {      
     
      toast.error( `Error saving data, Validate your internet connection.${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        transition: Flip
      })
    });


  

    

   
  }  


  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <div className="orders-title">             
            <h3>Update product</h3>            
          </div>
        </Col>       
      </Row>
      
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" value={productName} onChange={(e) => setProductName(`${e.target.value}`)} />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={productCategory}
              onChange={(e) => setProductCategory(`${e.target.value}`)}
            >
              <option value="Candies">Candies</option>
              <option value="Cookies">Cookies</option>
              <option value="Cakes">Cakes</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
            </Form.Control>
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <FormControl aria-label="Amount (to the nearest dollar)" value={productPrice} onChange={(e) => setProductPrice(`${e.target.value}`)} />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={productStatus}
              onChange={(e) => setProductStatus(`${e.target.value}`)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>              
            </Form.Control>
          </Form.Group>


          

          
          <Button variant="primary" onClick={saveData}>
            Save
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default EditProducts;