import Institution from "../../models/institutions.js";

import Items from "../../models/items/items(todelete).js";
import ItemTypes from "../../models/items/itemTypes.js";
import mongoose from 'mongoose'

export async function addInstitution({
    name,
    website,
    info,
    address,
    organisationType,
    userId }) {

    try {

        const addInstitution = await Institution.findOneAndUpdate({
            name
        }, {
            name,
            website,
            address,
            info,
            institutionType,
            creationInfos: {
                creator: userId
            } 
        },{upsert:true})
        console.log("addOrganisation")
        console.log(addOrganisation)
        return null
    } catch (error) {
        console.log(error)
        return error
    }

}

