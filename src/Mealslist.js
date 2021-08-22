import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { TextField, IconButton, Radio, FormControlLabel, RadioGroup, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import axios from 'axios';
import { whileStatement } from '@babel/types';

// not a array, I choose a list to symplify the responsive display
// when I make a array, I switch on mobile with a list of card
// but I don't have time to make this (with search, sort, pagination)
const ListItems = styled.div`
  margin: 1em;
  padding: 0.25em 1em;
  display: flex;
  flex-wrap: wrap;
`;

const ActionOnTable = styled.div`
  margin: 1em;
  display: flex;
`;

const Item = styled.div`
  flex: 1;
  margin: 1em;
  display: flex;
  font-size: 1em;
  flex-wrap: wrap;
  cursor: pointer;
  min-width: 250px;
  max-width: 400px;
  background: white;
  border-radius: 3px;
  align-items: center;
  border: 1px solid #fafafa;
  box-shadow: 0 1px 2px #ccc;
`;

const Logo = styled.img`
  display: flex;
  max-width: 64px;
  align-self: center;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  font-size: .8em;
  padding: .5em 1em;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ItemContentTitle = styled.div`
  display: flex;
  font-size: 1em;
  padding: 0 0 .5em;
  color: #333;
  font-weight: 700;
  text-align: left;
  flex-wrap: wrap;
`;

const ItemContentOrigin = styled.div`
  display: flex;
  font-size: .75em;
  padding: 0 0 4px;
  color: #333;
  flex-wrap: wrap;
  word-break: break-all;
`;

const ItemContentTag = styled.div`
  display: flex;
  font-size: .75em;
  padding: 0;
  color: #777;
  flex-wrap: wrap;
  word-break: break-all;
`;

const PaginationBlock = styled.div`
  display: flex;
  padding: 0;
  color: #777;
  justify-content: center;
  width: 100%;
`;

const PaginationButton = styled.div`
  flex: 1;
  min-width: 100px;
  max-width: 150px;
  text-align: center;
  margin: 0 1em;
  padding: .5em .75em;
  border: 1px solid #3f51b5;
  color: #3f51b5;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
      background: #3f51b5;
      color: white;
  }
`;

export default function Mealslist(props) {

    const [sortBlockVisible, setSortBlockVisible] = useState(false);
    const [sortBlockChoice, setSortBlockChoice] = useState('meal');
    const [pagination, setPagination] = useState(0);
    const [paginationIdx, setPaginationIdx] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // The filter search on Meal name, Area and Tags. Every time in lowercase without space (to search with space, I must split search sentence for each space in array but not the exercise and time to do this)

    useEffect(() => {
        console.log("ouverture de la page d acceuil - componentDidMount")
        return () => {
            console.log("fermeture de la page d acceuil - componentWillUnmount")
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchValue === '') setSearchResult([])
        else axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchValue).then((response) => setSearchResult(response.data.meals)).catch((error) => console.log(error))
    }, [searchValue])

    const getIngredientNMesure = (mealsItem) => {
        let res = 0
        for (let i = 0; i <= 20; i++) {
            if (mealsItem["strIngredient" + i] && mealsItem["strIngredient" + i] !== "") res++;
        }
        return res
    }

    return (
        <>
            <ActionOnTable className="actionOnTable">
                <TextField placeholder="Search name of meal or contry or by tags" fullWidth label="Search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                <FormControl style={{ minWidth: '80px' }}>
                    <InputLabel id="nbItems">Pagination</InputLabel>
                    <Select labelId="nbItems" value={pagination} onChange={(e) => { setPagination(e.target.value); setPaginationIdx(0); }}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={() => { setSortBlockVisible(!sortBlockVisible) }} ><FilterListIcon /></IconButton>
            </ActionOnTable>
            {sortBlockVisible && <div style={{ margin: '1em 2em', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Sort by :
                <RadioGroup row name="radioSortChoice" defaultValue="meal">
                    <FormControlLabel value="meal" control={<Radio color="primary" />} label="Meal name" labelPlacement="start" onChange={(e) => { setSortBlockChoice(e.target.value) }} />
                    <FormControlLabel value="area" control={<Radio color="primary" />} label="Country" labelPlacement="start" onChange={(e) => { setSortBlockChoice(e.target.value) }} />
                    <FormControlLabel value="tags" control={<Radio color="primary" />} label="Tags" labelPlacement="start" onChange={(e) => { setSortBlockChoice(e.target.value) }} />
                </RadioGroup>
            </div>}
            <ListItems>
                {searchResult && searchResult.length > 0 && <div style={{ width: '100%', border: '1px solid #3f51b5', background: '#3f51b5', color: 'white', padding: '1.5em 2.5em', textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    <h2 style={{ width: '100%' }}>Search on API</h2>
                    {searchResult.map((val, idx) => {
                        return <Item key={idx}>
                            <Link to={"/detail?id=" + val.idMeal} style={{ display: 'flex', flex: 1 }}>
                                <Logo src={val.strMealThumb} alt="thumbnail of meals" />
                                <ItemContent>
                                    <ItemContentTitle>{val.strMeal}</ItemContentTitle>
                                    <ItemContentOrigin>Origine : {val.strArea} </ItemContentOrigin>
                                    <ItemContentTag>{val.strTags}</ItemContentTag>
                                </ItemContent>
                            </Link>
                        </Item>
                    })}
                </div>}
                {props.datas.filter(obj => {
                    if (searchValue !== '') {
                        if ((obj.strMeal && obj.strMeal.toLowerCase().includes(searchValue.toLowerCase())) ||
                            (obj.strArea && obj.strArea.toLowerCase().includes(searchValue.toLowerCase())) ||
                            (obj.strTags && obj.strTags.toLowerCase().includes(searchValue.toLowerCase()))) return true
                        else return false
                    } else return true
                }).sort((a, b) => {
                    if (sortBlockVisible) {
                        if (sortBlockChoice === 'meal' && a.strMeal) return a.strMeal.localeCompare(b.strMeal)
                        if (sortBlockChoice === 'area' && a.strArea) return a.strArea.localeCompare(b.strArea)
                        if (sortBlockChoice === 'tags' && a.strTags) return a.strTags.localeCompare(b.strTags)
                    }
                    return true;
                }).map((val, idx) => {
                    if (pagination !== 0 && ((idx >= (pagination * (paginationIdx + 1))) || (idx < (pagination * paginationIdx)))) return false
                    return <Item key={idx}>
                        <Link to={"/detail?id=" + val.idMeal} style={{ display: 'flex', flex: 1 }}>
                            <Logo src={val.strMealThumb} alt="thumbnail of meals" />
                            <ItemContent>
                                <ItemContentTitle>{val.strMeal}</ItemContentTitle>
                                <ItemContentOrigin>Origine : {val.strArea} </ItemContentOrigin>
                                <ItemContentOrigin>{getIngredientNMesure(val)} Ingredients</ItemContentOrigin>
                                <ItemContentTag>{val.strTags}</ItemContentTag>
                            </ItemContent>
                        </Link>
                    </Item>
                })}
                {pagination !== 0 && (
                    <PaginationBlock>
                        <PaginationButton onClick={() => { if (paginationIdx > 0) setPaginationIdx(paginationIdx - 1) }}>Previous</PaginationButton>
                        <PaginationButton onClick={() => { if (paginationIdx < (props.datas.length / pagination)) setPaginationIdx(paginationIdx + 1) }}>Next</PaginationButton>
                    </PaginationBlock>
                )}
            </ListItems>
        </>
    );
}
