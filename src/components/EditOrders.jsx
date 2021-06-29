import React,{ useState,useEffect,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container,Row,Col,Button,Form,InputGroup,FormControl } from 'react-bootstrap';
import ReactTable  from "react-table"
import treeTableHOC from "react-table/lib/hoc/treeTable"

import { toast ,Flip,ToastContainer} from "react-toastify"
import axios from 'axios';

import '../styles/components/Orders.css';
import "react-toastify/dist/ReactToastify.css"


const TreeTable = treeTableHOC(ReactTable)

const EditOrders = ({ products }) => {

  const  {id} = products.match.params
  const  {numero} = products.match.params
  

  const [consumer, setConsumer] = useState("");
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("2021-29-06");

  const [product, setProduct] = useState([]);
  const [items, seItems] = useState([]);
  const [total, setTotal] = useState("0");

  const [subtotal, setSubtotal] = useState("0");
  const [citytag, setCitytag] = useState("0");
  const [countrytag, setCountrytag] = useState("0");
  const [statetag, setStatetag] = useState("0");
  const [federaltag, setFederaltag] = useState("0");

  const headers = {
      
    'Access-Control-Allow-Origin':'*' ,  
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }



   const procesData2 = useCallback((data) =>{
    
    const info = data;
    
    
    Object.keys(info).map(function(key, index) {
     
      info[key].action = (
        <div> 
          <>
            <Button variant="outline-warning">EDIT</Button>           
          </>
          <>
            <Button variant="outline-danger">DELETE</Button>            
          </>
        </div>
);

info[key].identification = (
  <div>{index+1}</div>
);

info[key].cost = (
  <div>
    $
    {parseFloat(info[key].quantity * info[key].unitprice)}
    {setSubtotal(parseFloat(subtotal) + parseFloat(info[key].quantity * info[key].unitprice))}
    {setCitytag((parseFloat(subtotal) + parseFloat(info[key].quantity * info[key].unitprice))*10/100)}
    {setCountrytag((parseFloat(subtotal) + parseFloat(info[key].quantity * info[key].unitprice))*5/100)}
    {setStatetag((parseFloat(subtotal) + parseFloat(info[key].quantity * info[key].unitprice))*8/100)}
    {setFederaltag((parseFloat(subtotal) + parseFloat(info[key].quantity * info[key].unitprice))*2/100)}
  </div>
);
     
      return null;
     
    });

    return info;
  },[]) 

  useEffect(() => { 

   /* axios({      
      url: 'http://localhost:8080/api/products',      
      method: 'get',
      crossdomain: true,
      mode:"cors",
      headers: { 'Access-Control-Allow-Origin':'*' ,  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'},

    })
      .then(({ data }) => { 
        seItems(data.items)
       
      })
      .catch((err) => {
        
        console.log(err);
      }); */
    
     





    axios.post('http://18.223.151.35:8083/api/orders/order',  {id} ,{crossdomain: true,
    mode:"cors", headers}
      
    ).then((response) => {  
    
      setConsumer(response.data.consumer)
      setStatus(response.data.status)
      setDate(response.data.date)
      seItems(procesData2(response.data.items))
     // setProductStatus(response.data.status)
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

       consumer,
       status,
       date,
       id

    }

    

    
    axios.put('http://18.223.151.35:8083:8080/api/orders',  object ,{crossdomain: true,
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
            <h3>
              Order Nro  
              {" "}            
              {numero}
            </h3>            
          </div>
        </Col>       
      </Row>
      
      <Row>
        <Col>Consumer:</Col>
        <Col xs={6}>{consumer}</Col>
        <Col>
          <Button href="/orders" variant="secondary">
            Back
          </Button>

        </Col>
      </Row>
      <Row>
        <Col>Status:</Col>
        <Col xs={6}>{status}</Col>
        <Col />
      </Row>
      <Row>
        <Col>Date:</Col>
        <Col xs={6}>{date}</Col>
        <Col />
      </Row>

      <Row>
        <TreeTable
          
         
          data={items}
          columns={[
            
              {
                Header: "N",
                accessor: "identification",
               
              },
              {
                Header: "Name",
                accessor: "name",
                width: 300
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                width: 200
              },
              {
                Header: "Unit Price",
                accessor: "unitprice",
                width: 170
              },
              {
                Header: "Cost",
                accessor: "cost",
                width: 170
              },
              {
                Header: "Actions",
                filterable: false,
                accessor: "action", 
                width: 200,             
               
              }   
             
             
            ]}
          defaultPageSize={5}
         
        />
      </Row>
      <Row>
        <Col xs={3} />
        <Col xs={7} />
        <Col>
          <Button href="/orders" variant="primary">
            Add item+
          </Button>

        </Col>
      </Row>

      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <strong>Subtotal</strong>
        </Col>
        <Col xs={1} />
        <Col xs={1}>         
          $
          {subtotal}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <strong>Taxes</strong>
        </Col>
        <Col xs={1} />
        <Col xs={1} />
      </Row>

      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <div>Total City Tax</div>
        </Col>
        <Col xs={1} />
        <Col xs={1}>         
          $
          {citytag}
        </Col>
      </Row>


     

      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <div>Total Country Tax</div>
        </Col>
        <Col xs={1} />
        <Col xs={1}>         
          $
          {countrytag}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <div>Total State Tax</div>
        </Col>
        <Col xs={1} />
        <Col xs={1}>         
          $
          {statetag}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <div>Total Federal Tax</div>
        </Col>
        <Col xs={1} />
        <Col xs={1}>         
          $
          {federaltag}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <strong>Total Taxes</strong>
        </Col>
        <Col xs={1} />
        <Col xs={1}>
          { (parseFloat(citytag)+parseFloat(federaltag)+parseFloat(countrytag)+parseFloat(statetag)).toFixed(2)}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={2}>         
          <strong>Total</strong>
        </Col>
        <Col xs={1} />
        <Col xs={1}>
          { (parseFloat(subtotal)+parseFloat(citytag)+parseFloat(federaltag)+parseFloat(countrytag)+parseFloat(statetag)).toFixed(2)}
        </Col>
      </Row>


      <Row>
        <Col xs={6} />
        <Col xs={2} />
        <Col xs={4}>         
          <Button href="/orders" variant="success">
            Complete Order
          </Button>
          <Button href="/orders" variant="danger">
            Reject Order
          </Button>

        </Col>
        
        
      </Row>


       
    </Container>
  );
}

export default EditOrders;