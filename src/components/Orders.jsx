import React,{ useState,useEffect,useCallback ,Fragment} from 'react';
import { Container,Row,Col,Button ,Modal} from 'react-bootstrap';
import ReactTable  from "react-table"
import treeTableHOC from "react-table/lib/hoc/treeTable"
import { toast ,Flip,ToastContainer} from "react-toastify"
import axios from 'axios';
import '../styles/components/Orders.css';
import "react-toastify/dist/ReactToastify.css"

const TreeTable = treeTableHOC(ReactTable)

const Orders = ({ products }) => {


  const headers = {
      
    'Access-Control-Allow-Origin':'*' ,  
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  const [id,setId] = useState("0")
  const [name,setName] = useState("")
  const [show, setShow] = useState(false);

  const deleteProduct = useCallback((id1,name) =>{     
    setShow(true)
    setId(id1)
    setName(name)
 },[])


 const deleteProduct2 = useCallback((id2) =>{  
   console.log(id2)
  axios.post('http://18.223.151.35:8083/api/orders/delete',  {id:id2} ,{crossdomain: true,
  mode:"cors", headers}
    
  ).then((response) => {   
    
    setShow(false)
    window.location.reload();
   
  })
  .catch((error) => {      
   
    toast.error( `Error saving data, Validate your internet connection.${error}`, {
      position: toast.POSITION.TOP_RIGHT,
      transition: Flip
    })
  });

  
},[])

  const handleClose = () => setShow(false);
  

  const procesData = useCallback((data) =>{
    
    const info = data;
    
    
    Object.keys(info).map(function(key, index) {
     
      info[key].action = (
        <div> 
          <>
            <Button href={`/edit-order/${info[key].id}/${index+1}`} variant="outline-warning">EDIT</Button>           
          </>
          <>
            <Button variant="outline-danger" onClick={()=>deleteProduct(info[key].id,info[key].name)}>DELETE</Button>            
          </>
        </div>
);

info[key].identification = (
  <div>{index+1}</div>
);
     
      return null;
     
    });

    return info;
  },[])


  const [controlTable, setControlTable] = useState({
    page: 0,
    pages:0,
    count: 10,
    data: [],
    isLoading: true,
    pageSizeOptions:[10],
    pageSize:10,
    filter:[],
    sorted:[]
  });

  useEffect(() => {
  
      
      axios({      
        url: 'http://18.223.151.35:8083/api/orders',      
        method: 'get',
        crossdomain: true,
        mode:"cors",
        headers: { 'Access-Control-Allow-Origin':'*' ,  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
  
      })
        .then(({ data }) => {
        
          console.log(data);
          setControlTable(

            {page: 0,
              pages:0,
              count: 10,
              data:procesData(data),
              isLoading: true,
              pageSizeOptions:[10],
              pageSize:10,
              filter:[],
              sorted:[]}
          )
        
         
         
        })
        .catch((err) => {
          
          console.log(err);
        });
      
       
    }, [])
  
      

  return (
    <Container>
      
      <Row>
        <Col>
          <div className="orders-title">             
            <h1>Orders</h1>            
          </div>
        </Col>       
      </Row>
      <Row>
        <Col sm={10} />
        <Col sm={2}><Button href="/create-order" variant="primary">Create Order</Button></Col>
      </Row>
      <Row>
        <TreeTable
          filterable
          className="nested-table"
          defaultFilterMethod={(filter, row) => {
              const id = filter.pivotId || filter.id
              return row[id] !== undefined
                ? String(row[id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                : true
            }}
          data={controlTable.data}
          columns={[
            
              {
                Header: "N",
                accessor: "identification",
               
              },
              {
                Header: "Consumer",
                accessor: "consumer",
                width: 300
              },
              {
                Header: "Date",
                accessor: "date",
                width: 200
              },
              {
                Header: "Status",
                accessor: "status",
                width: 170
              },
              {
                Header: "Actions",
                filterable: false,
                accessor: "action", 
                width: 200,             
               
              }   
             
             
            ]}
          defaultPageSize={10}
         
        />
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete Order!
          <p>{name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>deleteProduct2(id)}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Orders;