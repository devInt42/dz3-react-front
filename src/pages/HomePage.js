import React, { useEffect, useState } from 'react';
import { Container,Row ,Navbar} from "react-bootstrap";
import CollapsibleExample from "../components/menu/Gnb";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import Gnb from '../components/menu/Gnb';

const Home = () => {
  return (
    <div className="Home">
    <Gnb/>
    <Container>
      <div>ㅎㅇ</div>
    </Container>
    </div>
  )
};

export default Home;
