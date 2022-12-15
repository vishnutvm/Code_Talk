import React from 'react';
import styled from 'styled-components';
import ProjectImageone from '../../assets/Images/project1.jpeg';
import {
  cardShadow,
  hoverEffect,
  darkThemeColor,
  themeColor,
} from '../../adminTheme';

const QuesList = styled.div`
width:80%;

  height: auto;
  background-color: white;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  display:flex;
  flex-direction:column;
  gap:1rem;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1476px) {
    /* width:100%
    display:flex;
  flex-direction:column;
  gap:1rem; */
  width:80%;
    height: max-content;
  }
`;

const Ques = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  @media screen and (min-width: 320px) and (max-width: 1476px){
    justify-content:space-around;
  }
`;
const QuesImage = styled.div`
  img {
    /* height: 4rem; */
    width: 14rem;
    border-radius: 1rem;
  }
`;
const Detail = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h3`
  font-weight: 500;
  font-size:1rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;
const SubTitle = styled.h5`
  font-weight: 300;
`;
const AllQues = styled.h5`
  text-align: end;
  color: ${themeColor};
  cursor: pointer;
`;

function QuizSection() {
  return (
    <QuesList>
      <Ques>
        <QuesImage>
          <img src={ProjectImageone} alt="" />
        </QuesImage>
        <Detail>
          <Title>Mongo DB 2021</Title>
          <SubTitle>1 day remaining</SubTitle>
        </Detail>
      </Ques>
      <Ques>
        <QuesImage>
          <img src={ProjectImageone} alt="" />
        </QuesImage>
        <Detail>
          <Title>Date with GIT</Title>
          <SubTitle>1 day remaining</SubTitle>
        </Detail>
      </Ques>
      <AllQues>See all Quis</AllQues>
    </QuesList>
  );
}

export default QuizSection;

//
