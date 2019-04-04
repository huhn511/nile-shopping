import * as Mam from '@iota/mam';
import { trytesToAscii } from '@iota/converter'
import { provider } from '../config.json';

export const fetchProduct = async (root, secretKey) => {

    let state_object = Mam.init(provider, generateSeed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    secretKey = 'TEST'
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)
        return itemEvents[itemEvents.length - 1];
    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};

export const fetchShopDetails = async (root, secretKey) => {

    let state_object = Mam.init(provider, generateSeed(), 2)
    state_object = Mam.changeMode(state_object, 'restricted', secretKey)

    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents[0];

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};


export const generateSeed = () => {
    if (window.crypto && window.crypto.getRandomValues) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
        let result = '';
        let values = new Uint32Array(81);
        window.crypto.getRandomValues(values);
        values.forEach(value => (result += charset[value % charset.length]));
        return result;
    } else throw new Error('Your browser is outdated and cant generate secure random numbers');
};

export const fetchCatalog = async (root, secretKey) => {

    let state_object = Mam.init(provider, generateSeed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', secretKey)
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents;

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};


