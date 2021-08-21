import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from './MealslistContainerSlice';
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

const Item = styled.div`
  flex: 1;
  margin: 1em;
  display: flex;
  font-size: 1em;
  flex-wrap: wrap;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #fafafa;
  box-shadow: 0 1px 2px #ccc;

  @media (max-width: 1024px) {
   flex-direction: column; 
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Logo = styled.img`
  display: flex;
  height: auto;
  height: auto;
  width: 100%;
  align-self: baseline;
`;

const ItemContent = styled.div`
  flex: 2;
  display: flex;
  font-size: .8em;
  padding: .5em 1em;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ItemContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  padding: 0 0 .5em;
  color: #333;
  font-weight: 700;
  flex-wrap: wrap;
`;

const ItemContentCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  padding: 0 0 4px;
  color: #333;
  flex-wrap: wrap;
  word-break: break-all;
`;

const ItemContentTag = styled.div`
  display: flex;
  font-size: .75em;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5em;
  padding: 0;
  color: #777;
  flex-wrap: wrap;
  word-break: break-all;
`;

const ItemContentIngredient = styled.div`
  display: flex;
  font-size: 1.15em;
  padding: .75em 1em;
  color: #777;
  min-width: 150px;
  max-width: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #eee;
  margin: .5em;
`;

const ItemContentInstruction = styled.div`
  display: flex;
  font-size: 1.15em;
  padding: 1em .75em;
  color: #333;
  line-height: 1.5em;
  text-align: justify;
  margin: .5em;
`;

// own useEffect
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Detail(props) {

    let query = useQuery();
    const mealsList = useSelector(state => getDetail(state, query.get("id")));

    useEffect(() => {
        console.log("ouverture de la page detail - componentDidMount")
        // I made this cause data load on root page and I can't pass so much time for this, it's not the exercise
        if (!mealsList) window.location.href = '/';
        return () => {
            console.log("fermeture de la page detail - componentWillUnmount")
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getIngredientNMesure = () => {
        let res = []
        for (let i = 0; i <= 20; i++) {
            if (mealsList["strIngredient" + i] && mealsList["strIngredient" + i] !== "") {
                if (mealsList["strMeasure" + i] && mealsList["strMeasure" + i] !== "") res.push(mealsList["strIngredient" + i] + " (" + mealsList["strMeasure" + i] + ")")
                else res.push(mealsList["strIngredient" + i])
            }
        }
        return res
    }

    return (
        <Item>
            {mealsList && <LogoWrapper><Logo src={mealsList.strMealThumb} alt="thumbnail of meals" /></LogoWrapper>}
            {mealsList && <ItemContent>
                <ItemContentTitle>{mealsList.strMeal}</ItemContentTitle>
                <ItemContentTag>{mealsList.strTags}</ItemContentTag>
                <ItemContentCenter>Origine : {mealsList.strArea} </ItemContentCenter>
                <ItemContentCenter>{mealsList.strCategory}</ItemContentCenter>
                <ItemContentCenter>
                    {getIngredientNMesure().map((val, idx) => {
                        return <ItemContentIngredient>{val}</ItemContentIngredient>
                    })}

                </ItemContentCenter>
                <ItemContentInstruction>{mealsList.strInstructions}</ItemContentInstruction>
            </ItemContent>}
        </Item>
    );
}
