import globalHook from 'use-global-hook';
import _ from 'lodash';
import * as actions from "./actions";

const initialState = {
    playCounts: [],
    counter: 0,
};

export const useGlobal = globalHook(initialState, actions);