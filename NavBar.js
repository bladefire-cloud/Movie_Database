import { useState } from 'react';
import { FloatingLabel, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    
const [show, setShow] = useState(false);

const handleShow = () => {
    console.log("handleShow");
    setShow(true);
  }
  
  const handleClose = () => {
    console.log("close");
    setShow(false);
  }



  function maxLengthCheck (object) {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

    const[title, setTitle]=useState('');

    const[year, setYear]=useState('');

    const[rating_percentage, setRating_Percentage]= useState('');
    
    const[genre, setGenre]=useState('');

    const[services, setServices]=useState('');

    const[producer, setProducer]=useState('');

    const[director, setDirector]=useState('');

    const[studio, setStudio]=useState('');

    const[trailer, setTrailer]=useState('');


    const handleSubmit=(e)=>{
      e.preventDefault()
      const movie={title,year,rating_percentage,genre,services,producer,director,studio,trailer}
        console.log(movie)
        fetch("http://localhost:9191/addMovie", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(movie)
      }).then((res)=>{
        console.log("New movie added")
        window.location.href="/movietable"
      })
    }

    

    const handleSearch=(e)=>{
      window.location.href="/searchmovie"
    }

    const [navigate, setNavigate] = useState();

    const logout =()=>{
      sessionStorage.clear();
      sessionStorage.removeItem("token");
      setNavigate({navigate:true});
      window.location.href="/";

  }

 

  return (
    <>
    <Navbar variant= "dark" style={{backgroundColor: 'darkOrange', marginBottom: '5%'}} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Movie Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" onClick={handleShow}>Add Movie</Nav.Link>
            <Nav.Link href="#logout" onClick={logout}>Logout</Nav.Link>
            <Nav.Link href="#logout"></Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-light" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

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
    Add Movie
  </Modal.Title>
</Modal.Header>
<Modal.Body>
  <h4>Movie Info</h4>
  <FloatingLabel controlId = "flaotingName" label="Title" >
    <Form.Control type ="text" placeholder="Title" style={{marginBottom: '2%'}} value={title} onChange={(e)=>setTitle(e.target.value)} />
    </FloatingLabel>
  <FloatingLabel
  label="Year"
  className="mb-3">
  <Form.Control maxLength={4} onInput={maxLengthCheck} type="text" placeholder="Year" value={year} onChange={(e)=>setYear(e.target.value)} />
</FloatingLabel>
<FloatingLabel label="Rating" >
    <Form.Control type ="text" placeholder="Rating" maxLength={2} onInput={maxLengthCheck} style={{marginBottom: '2%'}} value={rating_percentage} onChange={(e)=>setRating_Percentage(e.target.value)} />
    </FloatingLabel>
<FloatingLabel label="Genre">
  <Form.Control type="text" placeholder="Genre" style={{marginBottom: '2%'}} value={genre} onChange={(e)=>setGenre(e.target.value)} />
</FloatingLabel>
<FloatingLabel label="Services" >
    <Form.Control type ="text" placeholder="Streaming Services" style={{marginBottom: '2%'}} value={services} onChange={(e)=>setServices(e.target.value)}/>
    </FloatingLabel>
  <FloatingLabel label="Producer" >
  <Form.Control type ="text" placeholder="Producer" style={{marginBottom: '2%'}} value={producer} onChange={(e)=>setProducer(e.target.value)}/>
  </FloatingLabel>
  <FloatingLabel  label="Director" >
    <Form.Control type ="text" placeholder="Director" style={{marginBottom: '2%'}} value={director} onChange={(e)=>setDirector(e.target.value)}/>
    </FloatingLabel>
    <FloatingLabel label="Studio" >
    <Form.Control type ="text" placeholder="Studio" style={{marginBottom: '2%'}} value={studio} onChange={(e)=>setStudio(e.target.value)}/>
    </FloatingLabel>
    <FloatingLabel label="Trailer Link" >
    <Form.Control type ="text" placeholder="Trailer Link" style={{marginBottom: '2%'}} value={trailer} onChange={(e)=>setTrailer(e.target.value)}/>
    </FloatingLabel>
</Modal.Body>
<Modal.Footer>
  <Button variant = "outline-warning" onClick={handleSubmit}>Submit</Button>
</Modal.Footer>
</Modal>
</>
  );
}

export default NavBar;