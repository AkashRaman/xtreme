import React, { useState, useEffect } from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';
import { useNavigate } from 'react-router-dom';
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import noteBg1 from "../assets/images/bg/noteBg1.png";
import noteBg2 from "../assets/images/bg/noteBg2.png";
import noteBg3 from "../assets/images/bg/noteBg3.png";
import noteBg4 from "../assets/images/bg/noteBg4.png";
import noteBg5 from "../assets/images/bg/noteBg5.png";
import noteBg6 from "../assets/images/bg/noteBg6.png";
import noteBg7 from "../assets/images/bg/noteBg7.png";
import noteBg8 from "../assets/images/bg/noteBg8.png";
import addNotes from "../assets/images/bg/addNotes.png";
import Blog from "../components/dashboard/Blog";
import {
  Card,
  CardBody,
} from "reactstrap";
import {
  CardImg,
  CardGroup,
} from "reactstrap";
import axios from "axios";
import { HOST } from "../config";

const images = [bg1,bg2,bg3,bg4];
const noteImages = [noteBg1,noteBg2,noteBg3,noteBg4,noteBg5,noteBg6,noteBg7,noteBg8];
const coverImages = ['https://i.postimg.cc/K8WTCjGR/notes-Wallpaper4.jpg','https://i.postimg.cc/CKHFkrQS/notes-Wallpaper5.jpg','https://i.postimg.cc/vHJMjdRG/notes-Wallpaper6.jpg'].sort( () => .5 - Math.random() );
let contentIndexes = {};

const Home = () => {
  const navigate = useNavigate();
  let u = localStorage.getItem("user");
  u = u !== 'null' ? JSON.parse(u) : null;
  const token = JSON.parse(localStorage.getItem('token'));

  const [user,setUser] = useState(u);

  console.log('contentIndexes',contentIndexes)  
  contentIndexes = user.contents.reduce((acc, cur) => ({ ...acc, [JSON.stringify(cur)]: (contentIndexes[JSON.stringify(cur)] !== undefined ? contentIndexes[JSON.stringify(cur)] : `${noteImages[Math.floor(Math.random()*noteImages.length)]}`) }), {});
  
  console.log('contentIndexes',contentIndexes)

  console.log(contentIndexes);

  useEffect(()=> {
    setTimeout(()=>{
      const delBtns = document.querySelectorAll('.delete-btn');
      [...delBtns].map(el => el.addEventListener('click',(e) => deleteNote(e)))
    },300);
  })

  const deleteNote = async (e) => {
    e.preventDefault();

    try {
      const index = e.target.id;
      const {data} = await axios.post(`${HOST}/user/del/${user._id}/${index}`,{ index },{
        headers: {
          "content-type": "application/json",
        },
      });

      console.log('Submitting...', data);
      localStorage.setItem('user',JSON.stringify(data));      

      setUser(data)
      window.location.reload();
    } catch(err){
      console.log(err);
    }
  }

  console.log(user)

  const contents = user.contents.slice(0,4);
  
  const BlogData = contents === [] ? [] : contents.map((content,i) => {return {
      image: contentIndexes[JSON.stringify(content)],
      title: content.title,
      subtitle: content.subtitle,
      description: content.description,
      id: user._id,
  }}); 
  
  const btn = user.contents.length !== 0 ? (
    user.contents.length <= 4 ? 
    {
      msg: `Feel free to create more`,
      title: 'Create More',
      navigateUrl: `/user/add/${token}`,
    } : 
    {
      msg: `Chech out other notes`,
      title: 'More',
      navigateUrl: `/notes`,
    }) :  
    {
    msg: `Oops! Looks like you haven't created any of them`,
    title: 'Add Notes',
    navigateUrl: `/user/add/${token}`,
  };

  console.log(BlogData);
  
  return (
    <Row className='m-4 pe-0'>
    <Row className='pe-0'>
      <Row className='p-4 pe-0 py-0'>
        <Col className='pe-0'>
          <CardGroup className="mb-5">
            <Card>
              <CardImg alt="Card image cap" src={coverImages[0]} top width="100%" />
              <CardBody>
                <CardTitle tag="h5"><h5 className="mb-3 mt-1">Welcome, {user.first_name +" " + user.last_name}</h5></CardTitle>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <Col className='pe-0'>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <ComponentCard title="Your lists">
          <Row className="mt-3">
          {(BlogData.length === 0) ?
              <Col xs="6">
                <div className="p-2">
                <img src={addNotes} className="img-fluid" alt="Phone image" />
                </div>
              </Col>
            : BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog 
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={"primary"}
              delColor={"danger"}
              index={index}
              id={blg.id}
            />
          </Col>
        )) 
        }
              <Col sm="6">
                <div className="p-2">
                  <h4 className="mb-1 mt-1">{btn.msg}</h4>
                </div>
                <div className="p-2">
                <Button onClick={(e) => navigate(`${btn.navigateUrl}`)} className="btn mx-auto" color="primary">
                  {btn.title}
                </Button>
                </div>
              </Col>
          </Row>
        </ComponentCard>
      </Col>
    </Row>
    </Row>
  );
};

export default Home;
