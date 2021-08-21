import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateData, addDatas, rawResult } from './MealslistContainerSlice';

import axios from 'axios';
import Mealslist from './Mealslist';

export default function MealslistContainer(props) {

    const dispatch = useDispatch()
    const mealsList = useSelector(rawResult);

    const getListOfMeal = () => {
        ['French', 'Italian', 'British', 'American', 'Canadian', 'Jamaican', 'Chinese'].forEach((val, idx) => {
            axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + val)
                .then(function (response) {
                    dispatch(addDatas(response.data.meals))
                    getDetailInfo(response.data.meals)
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    }

    const getDetailInfo = (datas) => {
        datas.forEach((val, idx) => {
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + val.idMeal)
                .then(function (response) {
                    dispatch(updateData(response.data.meals[0]))
                })
                .catch(function (error) {
                    console.log(error);
                })
        });
    }

    useEffect(() => {
        console.log("ouverture de la page d acceuil - componentDidMount");

        if (mealsList.length === 0) getListOfMeal();

        return () => {
            console.log("fermeture de la page d acceuil - componentWillUnmount")
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Mealslist datas={mealsList} />;
}
