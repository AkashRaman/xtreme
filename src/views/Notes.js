import { Col, Row } from "reactstrap";
import React, { useState, useEffect } from 'react';
import Blog from "../components/dashboard/Blog";
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
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import {
  CardImg,
  CardGroup,
} from "reactstrap";
import axios from "axios";
import { HOST } from "../config";
// 
const images = [bg1,bg2,bg3,bg4];
const noteImages = [noteBg1,noteBg2,noteBg3,noteBg4, noteBg5, noteBg6, noteBg7, noteBg8];
const coverImages = ['https://i.postimg.cc/PrzKyDgQ/notes-Wallpaper.jpg','https://i.postimg.cc/jdzkxVwx/notes-Wallpaper2.jpg','https://i.postimg.cc/W1NSsdc8/notes-Wallpaper3.jpg'].sort( () => .5 - Math.random() );
// const originalBg = {
//   wallpaper3: `https://i.postimg.cc/2SpXvCtH/lakeside-sunrise-early-morning-minimal-art-gradient-3440x1440-4587.png`,
// }

// [
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "This is simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Lets be simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Don't Lamp blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: noteImages[Math.floor(Math.random()*4)],
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
// ];

let contentIndexes = {};

const Notes = () => {
  const navigate = useNavigate();
  let u = localStorage.getItem("user");
  u = u !== 'null' ? JSON.parse(u) : null;
  
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

  console.log('note function');

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

      // user = data;
      setUser(data)
      console.log('deleter');
      window.location.reload();
      // setContentIndexes(getAllIndexes());
    } catch(err){
      console.log(err);
    }
  }

  console.log(user)
  
  const BlogData = user.contents === [] ? [] : user.contents.map((content,i) => {return {
      image: contentIndexes[JSON.stringify(content)],
      title: content.title,
      subtitle: content.subtitle,
      description: content.description,
      id: user._id,
      deleting: false,
  }}); 

  console.log(BlogData);
  return (
    <div className="m-4">
      <Row>
        <Col>
          <CardGroup className="mb-5">
            <Card>
              <CardImg alt="Card image cap" src={coverImages[0]} top width="100%" />
              <CardBody>
                <CardTitle tag="h5"><h1 className="mb-3 mt-1">Notes</h1></CardTitle>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <Row>
        {(BlogData.length === 0) ?
            <Row className="mt-3">
              <Col xs="6">
                <div className="p-2">
                <img src={addNotes} className="img-fluid" alt="Phone image" />
                </div>
              </Col>
              <Col xs="6">
                <div className="p-2">
                  <h4 className="mb-1 mt-1">`Oops! Looks like you haven't created any of them`</h4>
                </div>
                <div className="p-2">
                <Button onClick={(e) => navigate(`/user/add/${user._id}`)} className="btn" color="primary">
                  Add Notes
                </Button>
                </div>
              </Col>
            </Row> 
            : BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              deleting = {blg.deleting}
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
        ))}
      </Row>
    </div>
  );
};

export default Notes;
