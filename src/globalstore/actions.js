import React from 'react';
import _ from "lodash"
import Airtable from 'airtable';

export const getAirtableData = async (airtableApiKey, airtableBaseId, tableName, viewName, filterCriteria, sortBy) => {
    if (!airtableApiKey || !airtableBaseId || !tableName || !viewName) return;
    return new Promise(function (resolve, reject) {
        const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId);
        base(tableName).select({
            view: viewName,
            filterByFormula: filterCriteria ? filterCriteria : '',
            sort: sortBy ? sortBy : []
        }).eachPage(function page(airtablerecords, fetchNextPage) {
            //console.log("***** from common airtable function for table = "+tableName)
            //console.log(airtablerecords)
            resolve(airtablerecords);
            fetchNextPage();
        }, function done(err) {
            if (err) {
                const errMessage = "ERROR while fetching data from Airtable : " + err;
                console.log(errMessage);
                return false;
            }
        });
    })
};

export const getPlayCount = (store, recordId) => {
    const record = _.find(store.state.playCounts, { recordId: recordId })
    return record && record.count;
}

export const incrementPlayCount = (store, recordId) => {
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
    // console.log("**** newstate", existingData)
    store.setState({ playCounts: existingData });
}

export const getPlayCountsAirtable = async (store) => {
    if (!process.env.GATSBY_AIRTABLE_KEY || !process.env.GATSBY_AIRTABLE_BASE) return;
    const airtablerecords = await getAirtableData(process.env.GATSBY_AIRTABLE_KEY, process.env.GATSBY_AIRTABLE_BASE, 'Recordings', 'Grid view');
    let allPlayCounts = [];
    airtablerecords && airtablerecords.forEach((record) => {
        allPlayCounts.push({
            recordId: record.id,
            count: record.fields.Plays || 0,
        })
    });
    console.log("***** allPlayCounts", allPlayCounts)
    store.setState({ playCounts: allPlayCounts });
}

export const incrementPlayCountAirtable = async (store, recordId) => {
    if (!process.env.GATSBY_AIRTABLE_KEY || !process.env.GATSBY_AIRTABLE_BASE) return;
    let existingData = store.state.playCounts;
    if(!existingData || existingData.length<=0) {
        await getPlayCountsAirtable(store);
        existingData = store.state.playCounts;
    }
    const index = _.findIndex(existingData, { recordId: recordId });
    const newCount = existingData[index].count + 1;
    existingData[index] = {
        recordId: existingData[index].recordId,
        count: newCount,
    }
    
    return new Promise(function (resolve, reject) {
        const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_KEY }).base(process.env.GATSBY_AIRTABLE_BASE);
        let updateData = [{
            "id": recordId,
            "fields": {}
        }]
        updateData[0].fields['Plays'] = newCount;
        base('Recordings').update(updateData, (err, record) => {
            if (err) {
                console.error("ERROR while updating reaction data to Airtable : ", err);
                return false;
            }                        
            store.setState({ playCounts: existingData });
            getPlayCountsAirtable(store)
            resolve(true);
        });
    })
}