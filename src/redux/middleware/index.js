// import React from 'react';
// import { ADD_POST } from '../constants/action-types'
 
 export function hateWordsMiddleware({ dispatch }) {
    return function(next){
        return function(action){
            // if(action.type === ADD_POST){
              
            //     return dispatch({ type: "FOUND_BAD_WORD" });
            // }
            return next(action);
        }
    }
}


