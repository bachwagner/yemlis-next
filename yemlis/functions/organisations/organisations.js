import Organisation from "../../models/organisations/organisations.js";

import Items from "../../models/items/items(todelete).js";
import ItemTypes from "../../models/items/itemTypes.js";
import mongoose from 'mongoose'

export async function addOrganisation({
    name,
    website,
    info,
    address,
    organisationType,
    userId }) {

    try {

        const addOrganisation = await Organisation.findOneAndUpdate({
            name
        }, {
            name,
            website,
            address,
            info,
            organisationType,
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

/*   const addOrg = await addOrganisation({
        name: "Ülker",
        website: "www.ulker.com",
        info: "Common Ülker",
        address:"Istanbul",
        organisationType: "company",
        userId
    })
    console.log("addOrg")
    console.log(addOrg) */