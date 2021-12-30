import globalHook from 'use-global-hook';
import _ from 'lodash';

const initialState = {
    playCounts: [],
    counter: 0,
};

const actions = {
    addToCounter: (store, amount) => {
        const newCounterValue = store.state.counter + amount;
        store.setState({ counter: newCounterValue });
        console.log("*******counter", store.state.counter)
      },
    getPlayCount: (store, recordId) => {
        const record = _.find(store.state.playCounts, { recordId: recordId })
        console.log("******* record", record);
        return record ? record.count : 0;
    },
    incrementPlayCount: (store, recordId) => {
        let existingData = store.state.playCounts;
        //find the record
        var index = _.findIndex(existingData, { recordId: recordId });
        if (index < 0) {
            existingData.push({
                recordId,
                count: 0,
            })
        }
        index = _.findIndex(existingData, { recordId: recordId });
        existingData[index] = {
            recordId: existingData[index].recordId,
            count: existingData[index].count + 1,
        }
        console.log("**** newstate", existingData)
        store.setState({ playCounts: existingData });
    },
};


export const useGlobal = globalHook(initialState, actions);