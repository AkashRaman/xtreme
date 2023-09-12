import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import wallpaper from "../assets/images/bg/viewWallpaper.jpg";

const bgImages = ['https://i.postimg.cc/9fnzfg8j/Khu-rung-mong-mo-8-scaled.jpg','https://images7.alphacoders.com/617/thumb-1920-617537.jpg'].sort(() => .5 - Math.random());

export default function View() {
    let user = JSON.parse(localStorage.getItem('user'));

    let index = localStorage.getItem("index");
    index = index !== 'null' ? JSON.parse(index) : 0;
    const content = user.contents[index];

    console.log(user,content)

    // `linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%)`
  return (
    <section style={{ minHeight: '100vh', backgroundImage: `url('${bgImages[0]}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <MDBContainer className="py-5 h-100 view-container" style={{backgroundImage: `url('${bgImages[0]}')`,}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol xl="10">
            <MDBCard className="mb-5" >
              <MDBCardBody className="p-4">
                <MDBTypography tag='h3'>{content.title}</MDBTypography>
                <hr className="mt-3 mb-4" />
                <div className="d-flex justify-content-start align-items-center">
                <MDBCardText className="small">
                  {content.subtitle}
                </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-5">
              <MDBCardBody className="p-4">
                <MDBCardText className="small">
                  {content.description}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}