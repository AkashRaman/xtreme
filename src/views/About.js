import React from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';


const About = () => {
  const features = [
    {
      title: 'Create Lists',
      desc: 'Your notes, lists and projects tracks that are created in our website are stored in cloud, meaning you can access them in any devices and anytime.',
      icon: 'bi-vinyl',
    },
    {
      title: 'Security',
      desc: 'All the informations that are stored in our website are protected. There is no neeed to worry about any kinds of Identity theft.',
      icon: 'bi-lock',
    },
    {
      title: 'Managing tools',
      desc: 'Our websites privides managing tools such as Modification and Deletion',
      icon: 'bi-umbrella',
    },
  ];
  return (
    <Row className='m-4'>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <ComponentCard
          title={<h1 className="mb-3 mt-1">Welcome to Xtreme Notes</h1>}
          subtitle={
            <p>
              Xtreme Note is a freemium productivity and note-taking web application. It includes adding new to-do lists, notes, project tracking, and provides managing tools such as modificationa and deletion. Feel free to use your Xtreme
            </p>
          }
        >
          
        </ComponentCard>
        <ComponentCard title="Features">
          <Row>
            {features.map((feature) => (
              <Col lg="4" className="mb-5 pb-3" key={feature.title}>
                <div>
                  <i className={`bi ${feature.icon} text-primary fs-2`} />

                  <CardTitle tag="h4" className="my-3">
                    {feature.title}
                  </CardTitle>
                  <CardSubtitle className="text-muted col-10">{feature.desc}</CardSubtitle>
                </div>
              </Col>
            ))}
          </Row>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default About;
