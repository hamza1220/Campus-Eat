import {SET_RESTAURANT } from './types';

export const setRestaurant = (restaurant) => dispatch => {
    dispatch({
            type: SET_RESTAURANT,
            payload: restaurant
        })
}