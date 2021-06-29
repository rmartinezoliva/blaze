import React,{ useState,useEffect } from 'react';
import { Container,Row,Col,Button,Form,InputGroup,FormControl } from 'react-bootstrap';
import ReactTable  from "react-table"
import treeTableHOC from "react-table/lib/hoc/treeTable"

import { toast ,Flip,ToastContainer} from "react-toastify"
import axios from 'axios';

import '../styles/components/Orders.css';
import "react-toastify/dist/ReactToastify.css"


const TreeTable = treeTableHOC(ReactTable)

const CreateOrders = ({ products }) => {

  const [consumer, setConsumer] = useState("");
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("2021-30-06");
  const [total, setTotal] = useState("0");


  const saveData = () => {
   
    const object={

       consumer,
       status,
       date
      

    }

    const headers = {
      
      'Access-Control-Allow-Origin':'*' ,  
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
    

    
    axios.post('http://localhost:8080/api/orders',  object ,{crossdomain: true,
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
            <h3>Create order</h3>            
          </div>
        </Col>       
      </Row>
      
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Consumer</Form.Label>
            <Form.Control placeholder="Enter consumer" value={consumer} onChange={(e) => setConsumer(`${e.target.value}`)} />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(`${e.target.value}`)}
            >
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
              
            </Form.Control>
          </Form.Group> 

         


          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label>Date</Form.Label>
            <Form.Control
              placeholder="2021-30-06"
              value={date}
              onChange={(e) => setDate(`${e.target.value}`)}
            />
          </Form.Group>


          

          
          <Button variant="primary" onClick={saveData}>
            Save
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default CreateOrders;