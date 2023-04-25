import { useState } from 'react';
import { Button, Container, FormLabel, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Center from './center';




function LoginForm({setToken}) {

const [show, setShow] = useState(false);

const handleShow = () => {
  console.log("handleShow");
  setShow(true);
}

const handleClose = () => {
  console.log("close");
  setShow(false);
}

const[name, setName]= useState('');

const[email, setEmail] = useState('');

const[password, setPassword] = useState('');

const[manager, setManager] = useState(false);
const handleChange = () => {

  setManager(!manager);
};

const handleSubmit=(e)=>{
  e.preventDefault()
  const user={name,email,password,manager}
  console.log(user)
  fetch("http://localhost:9191/addUser", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(user)
  }).then((res)=>{
  console.log("New user added")
  window.location.href="/"
  })
}

const [login, setLogin] = useState({
  email:'',
  password:''

})

const onInputChange = (e) => {
  console.log(e);
  setLogin({
      ...login,[e.target.name]: e.target.value
  });
}

const handleLogin = (e) => {
  e.preventDefault();
  
  console.log("Login ");
  fetch('http://localhost:9191/login', {
 
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json' },
    body: JSON.stringify(login),
    credentials : 'same-origin',
    }).then((res) => {
      console.log(res)     
      return res.json(); 
    }).then((res) =>{
      console.log(res);
      setToken(res);
      window.location.href="/movietable";
    });

}


  return (
    <>
    <Center>
    <Container style={{width: '50%',backgroundColor: 'white', padding: '5%', borderRadius: '10px'}}>
      <FormLabel style={{}}>Login Page</FormLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" 
        onChange={ (e) => onInputChange(e)}
        name="email"/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password"
        onChange={ (e) => onInputChange(e)}
        name="password"/>
      </FloatingLabel>
      <Button variant = "outline-warning" style={{marginTop: '5%', marginRight: '5%'}} onClick={handleLogin}>Login</Button>
      <Button variant="outline-warning" style={{marginTop: '5%'}} onClick = {handleShow}>Create Account</Button>
      </Container>
      </Center>
      

      <Modal 
      show={show} 
      onHide = {handleClose}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>User Info</h4>
        <FloatingLabel controlId = "flaotingName" label="Name" >
          <Form.Control type ="text" placeholder="Name" style={{marginBottom: '5%'}} value={name} onChange={(e)=>setName(e.target.value)}/>
          </FloatingLabel>
        <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3">
        <Form.Control type="email" placeholder="name@example.com"  value={email} onChange={(e)=>setEmail(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </FloatingLabel>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Manager"
        value = {manager}
        onChange={handleChange}
        style = {{marginTop: "5%"}}
      />
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "outline-warning" onClick = {handleSubmit}>Submit</Button>
      </Modal.Footer>
      </Modal>

      </>
  );
}

export default LoginForm;