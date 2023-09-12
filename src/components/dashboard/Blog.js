import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Blog = (props) => {
  const navigate = useNavigate();
  const [modifying,setModifying] = useState(false);
  const [deleteClicked,setDeleteClicked] = useState(props.deleting);
  
  console.log(deleteClicked);
  console.log(props,deleteClicked);
  // setDeleting(props.deleting);
  const redirect = () => {
    setModifying(true);
    localStorage.setItem('index', JSON.stringify(props.index));
    setTimeout(()=>{
      navigate(`/user/modify/${props.id}/${props.index}`)
    },300)
  }

  // const container = btn.parentNode;
  //   const deleteSpinnerHTML = `<div class="ml-2 spinner-border spinner-border-sm text-danger"></div>`;
  //   container.removeChild(btn);
  //   console.log('fuction working');
  //   container.insertAdjacentHTML('beforeend',deleteSpinnerHTML);

  return (
    <Card className="cursor-pointer" onClick={e => {
      if(e.target.closest('.modify-btn') || e.target.closest('.delete-btn')) return;
      localStorage.setItem('index', JSON.stringify(props.index));
      navigate(`/notes/${props.id}/${props.index}`)
      }} id={`note_${props.index}`}>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text.split('').length > 75 ? props.text.slice(0,72) + '...' : props.text}</CardText>
        {!modifying? <Button className="modify-btn" onClick={(e) => redirect()} color={props.color} size="sm">Modify</Button> : <Spinner animation="border" variant="primary" size="sm"/>}
        {!deleteClicked? <Button onClick={(e)=>{
          setDeleteClicked(true)}
          } className="delete-btn ms-3" id={props.index} color={props.delColor} size="sm">Delete</Button> : <Spinner className="ml-2" animation="border" variant="danger" size="sm"/>}
        
      </CardBody>
    </Card>
  );
};

export default Blog;
