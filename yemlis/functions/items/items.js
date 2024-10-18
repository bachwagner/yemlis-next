import Items from "../../models/items/items(todelete).js";
import ItemTypes from "../../models/items/itemTypes.js";
import mongoose from 'mongoose'

export async function addItem({ name,usdaName, formula, info, itemType, userId }) { // magnesium, vit d, etc  

    try {
        const isItemTypeId = mongoose.isValidObjectId(itemType)
        let itemTypeId
        if (!isItemTypeId) {
            const findItemType = await ItemTypes.findOne({ name: itemType })
            console.log("findItemType")
            console.log(itemType)
            
            if (!findItemType) throw Error("Item Type Cannot be Found, "+itemType)
            itemTypeId = findItemType._id
        } else {
            itemTypeId = itemType
        }

        const addItem = await Items.findOneAndUpdate({
            name
        }, {
            name,
            usdaName,
            formula,
            info,
            itemType:itemTypeId,
            creationInfo: { creator: userId }
        }, {
            new: true,
            upsert: true
        })



        return addItem
    } catch (error) {
        console.log(error)
        return error
    }

}

export async function addItems(itemObjs) {
    let added = []
    for (const item of itemObjs) {
        const add = await addItem({ ...item });
        if (add) added.push(item.name)
    }
    return added
}



/*    const itemsToAdd = [{
        name: "Cryptoxanthin, beta",
        formula: "",
        info: "",
        itemType: "Organic Compounds",
        userId
    },{
        name: "Cryptoxanthin, alpha",
        formula: "",
        info: "",
        itemType: "Organic Compounds",
        userId
    },{
        name: "Tocotrienol, gamma",
        formula: "",
        info: "",
        itemType: "Organic Compounds",
        userId
    },{
        name: "Tocotrienol, delta",
        formula: "",
        info: "",
        itemType: "Organic Compounds",
        userId
    },{
        name: "Tocotrienol, delta",
        formula: "",
        info: "",
        itemType: "Organic Compounds",
        userId
    },{
        name: "PUFA 22:6 n-3 (DHA)",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "PUFA 20:3 n-6",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "SFA 22:0",
        formula: "",
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "PUFA 20:5 n-3 (EPA)",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "PUFA 22:2",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "PUFA 22:5 n-3 (DPA)",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "SFA 11:0",
        formula: "",
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "SFA 17:0",
        formula: "",
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "SFA 24:0",
        formula: "",
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "SFA 24:0",
        formula: "",
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "SFA 20:2",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "TFA 16:1",
        formula: "",
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "TFA 18:1",
        formula: "",
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "TFA 22:1",
        formula: "",
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "TFA 15:1",
        formula: "",
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "Fatty acids, total trans-polyenoic",
        formula: "",
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "MUFA 14:1",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "MUFA 17:1",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "MUFA 24:1",
        formula: "",
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "MUFA 24:1",
        formula: "", 
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "PUFA 18:3i",
        formula: "", 
        info: "", 
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    },{
        name: "Ash",
        formula: "", 
        info: "", 
        itemType: "Inorganic Compounds",
        userId
    },{
        name: "Vitamin K (Menaquinone-4)",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "Nitrogen",
        formula: "", 
        info: "", 
        itemType: "Elements",
        userId
    },{
        name: "Choline",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Choline, from phosphotidyl choline",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Choline, from phosphocholine",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Carbohydrate, by summation",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Fatty acids, total trans-dienoic",
        formula: "", 
        info: "", 
        itemType: "Trans Fats",
        userId
    },{
        name: "Total fat",
        formula: "", 
        info: "", 
        itemType: "Lipids",
        userId
    },{
        name: "trans-beta-Carotene",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "cis-beta-Carotene",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "cis-Lutein/Zeaxanthin",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "cis-Lycopene",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "Vitamin D2 (ergocalciferol)",
        formula: "", 
        info: "ergocalciferol", 
        itemType: "Vitamins",
        userId
    },{
        name: "Vitamin D3 (cholecalciferol)",
        formula: "", 
        info: "cholecalciferol", 
        itemType: "Vitamins",
        userId
    },{
        name: "Vitamin D (D2 + D3), International Units",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "25-hydroxycholecalciferol",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "SFA 15:0",
        formula: "", 
        info: "", 
        itemType: "Saturated Fatty Acids",
        userId
    },{
        name: "Glutamic acid",
        formula: "", 
        info: "", 
        itemType: "Non Essential Amino Acids",
        userId
    },{
        name: "10-Formyl folic acid",
        formula: "10HCOFA", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "5-Formyltetrahydrofolic acid",
        formula: "5-HCOH4", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "5-methyl tetrahydrofolate",
        formula: "5-MTHF", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "5-methyl tetrahydrofolate",
        formula: "5-MTHF", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Phytofluene",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Phytoene",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "trans-Lycopene",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Boron, B",
        formula: "", 
        info: "", 
        itemType: "Elements",
        userId
    },{
        name: "Sulfur, S",
        formula: "", 
        info: "", 
        itemType: "Elements",
        userId
    },{
        name: "Beta-sitosterol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Stigmasterol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Citric acid",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Malic acid",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Delta-7-Stigmastenol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Stigmastadiene",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Ergosterol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Ergothioneine",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Vitamin D4",
        formula: "", 
        info: "", 
        itemType: "Vitamins",
        userId
    },{
        name: "Ergosta-7-enol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Ergosta-7,22-dienol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Ergosta-5,7-dienol",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Beta-glucan",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Glutathione",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Daidzin",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Genistin",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Glycitin",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Verbascose",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Raffinose",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Stachyose",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Daidzein",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Genistein",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Carotene, gamma",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Oxalic acid",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Quinic acid",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },{
        name: "Low Molecular Weight Dietary Fiber (LMWDF)",
        formula: "", 
        info: "", 
        itemType: "Fibers",
        userId
    },{
        name: "High Molecular Weight Dietary Fiber (HMWDF)",
        formula: "", 
        info: "", 
        itemType: "Fibers",
        userId
    },{
        name: "Pyruvic acid",
        formula: "", 
        info: "", 
        itemType: "Organic Compounds",
        userId
    },]

     const addI =await addItems(itemsToAdd)   
     
     const SFAs = [{
        name: "Fatty acids, total saturated",
        formula: "",
        info: "Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 4:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 6:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 8:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 10:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 12:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 14:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 16:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "SFA 18:0",
        formula: "",
        info: "Saturated Fatty Acid",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Propanoic Acid",
        formula: "CH3CH2COOH",
        info: "C3:0 Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Butyric acid",
        formula: "CH3(CH2)3COOH",
        info: "C4:0 Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Valeric acid",
        formula: "CH3(CH2)3COOH",
        info: "C5:0 Pentanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Caproic acid",
        formula: "CH3(CH2)4COOH",
        info: "C6:0 Hexanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Enanthic acid",
        formula: "CH3(CH2)5COOH",
        info: "C7:0 Heptanoic acid	Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Caprylic acid",
        formula: "CH3(CH2)6COOH",
        info: "C8:0 Octanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Pelargonic acid",
        formula: "CH3(CH2)7COOH",
        info: "C9:0 Nonanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Capric acid",
        formula: "CH3(CH2)8COOH",
        info: "C10:0 Decanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Undecylic acid",
        formula: "CH3(CH2)9COOH",
        info: "C11:0 Undecanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Lauric acid",
        formula: "CH3(CH2)10COOH",
        info: "C12:0 Dodecanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Tridecylic acid",
        formula: "CH3(CH2)11COOH",
        info: "C13:0 Tridecanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Myristic acid",
        formula: "CH3(CH2)12COOH",
        info: "C14:0 Tetradecanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Pentadecylic acid",
        formula: "CH3(CH2)13COOH",
        info: "C15:0 Pentadecanoic acid Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Palmitic acid",
        formula: "CH3(CH2)14COOH",
        info: "C16:0 Hexadecanoic acid, Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Margaric acid",
        formula: "CH3(CH2)15COOH",
        info: "C17:0 Heptadecanoic acid	Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Stearic acid",
        formula: "CH3(CH2)16COOH",
        info: "C18:0 Octadecanoic acid	Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Nonadecylic acid",
        formula: "CH3(CH2)17COOH",
        info: "C19:0 Nonadecanoic acid	Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Arachidic acid",
        formula: "CH3(CH2)18COOH",
        info: "C20:0 Icosanoic acid	Common Fatty acids, total saturated",
        itemType: "Saturated Fatty Acids",
        userId
    }, {
        name: "Fatty acids, total monounsaturated",
        formula: "CnH2n-2O2",
        info: "Monounsaturated fats",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "MUFA 16:1",
        formula: "MUFA",
        info: "Monounsaturated fats",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "MUFA 18:1",
        formula: "MUFA",
        info: "Monounsaturated fats",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "MUFA 20:1",
        formula: "MUFA",
        info: "Monounsaturated fats",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "MUFA 22:1",
        formula: "MUFA",
        info: "Monounsaturated fats",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Palmitoleic Acid",
        formula: "C:16 omega7",
        info: "Monounsaturated Fatty Acid",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Vaccenic acid",
        formula: "C:18 omega7",
        info: "Monounsaturated Fatty Acid",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Gondoric acid",
        formula: "C:20 omega9",
        info: "Monounsaturated Fatty Acid",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Erucic acid",
        formula: "C:22 omega9",
        info: "Monounsaturated Fatty Acid",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Nervonic acid",
        formula: "C:24 omega9",
        info: "Monounsaturated Fatty Acid",
        itemType: "Mono Unsaturated Fatty Acids",
        userId
    }, {
        name: "Fatty acids, total polyunsaturated",
        formula: "PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "PUFA 18:2",
        formula: "PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "PUFA 18:3",
        formula: "PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "PUFA 18:4",
        formula: "PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "PUFA 20:4",
        formula: "PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Hexadecatrienoic acid",
        formula: "HTA 16:3 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Stearidonic acid",
        formula: "SDA 18:4 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Eicosatrienoic acid",
        formula: "ETE 20:3 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Eicosatetraenoic acid",
        formula: "ETA 20:3 (n-4) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Eicosatetraenoic acid",
        formula: "ETA 20:4 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Eicosapentaenoic  acid ",
        formula: "EPA 20:5 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Heneicosapentaenoic acid ",
        formula: "HPA 21:5 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Docosapentaenoic acid",
        formula: "DPA 22:5 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids DPA, Clupanodonic acid",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Docosahexaenoic acid ",
        formula: "DHA 22:5 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids, Cervonic acid",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Tetracosapentaenoic acid",
        formula: "24:5 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids, Nisinic acid",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Tetracosahexaenoic acid",
        formula: "24:6 (n-3) PUFA",
        info: "Polyunsaturated Fatty Acids, Nisinic acid",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Linolenic acid",
        formula: "LA 18:2 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Gamma-linolenic acid",
        formula: "GLA-PUFA 18:3",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Eicosadienoic acid",
        formula: "SDA 20:2 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Dihomo-gamma-linolenic acid",
        formula: "ETE 20:3 (n-6) DGLA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Arachidonic acid",
        formula: "ETA 20:4 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Docosadienoic acid",
        formula: "ETA 22:2 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Adrenic acid (AdA)",
        formula: "AdA 20:4 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Docosapentaenoic acid (DPA)",
        formula: "DPA 20:5 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Tetracosatetraenoic acid",
        formula: "ETA 24:4 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Tetracosapentaenoic acid",
        formula: "ETA 24:5 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Tetracosapentaenoic acid",
        formula: "ETA 24:5 (n-6) PUFA",
        info: "Polyunsaturated Fatty Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Rumenic acid",
        formula: "18:2 (n-7) 18:2 (n-6)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "alpha-Calendic acid",
        formula: "18:3 (n-6)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "beta-Calendic acid",
        formula: "18:3 (n-6)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Jacaric acid",
        formula: "18:3 (n-6)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "alpha-Eleostearic acid",
        formula: "18:3 (n-5)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "beta-Eleostearic acid",
        formula: "18:3 (n-5)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Catalpic acid",
        formula: "18:3 (n-5)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Punicic acid",
        formula: "18:3 (n-5)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Rumelenic acid",
        formula: "18:3 (n-3)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "alpha-Parinaric acid",
        formula: "18:4 (n-3)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "beta-Parinaric acid",
        formula: "18:4 (n-3)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Bosseopentaenoic acid",
        formula: "20:5 (n-6)",
        info: "Polyunsaturated Fatty Acids, Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Pinolenic acid",
        formula: "18:3 (n-6)",
        info: "Polyunsaturated Fatty Acids, Other Conjugated Linoleic Acids",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Sciadonic acid",
        formula: "20:3 (n-6)",
        info: "Polyunsaturated Fatty Acids, other",
        itemType: "Poly Unsaturated Fatty Acids",
        userId
    }, {
        name: "Trans Fats",
        formula: "",
        info: "Trans Fats",
        itemType: "Trans Fats",
        userId
    }, {
        name: "Cholesterol",
        formula: "20:3 (n-6)",
        info: "C27H46O",
        itemType: "Steroids",
        userId
    }, {
        name: "Alanine",
        formula: "Ala",
        info: "Amino Acid",
        itemType: "Non Essential Amino Acids",
        userId
    }, {
        name: "Arginine",
        formula: "Arg",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Asparagine",
        formula: "Asn",
        info: "Amino Acid",
        itemType: "Non Essential Amino Acids",
        userId
    }, {
        name: "Aspartic acid ",
        formula: "Asp",
        info: "Amino Acid",
        itemType: "Non Essential Amino Acids",
        userId
    }, {
        name: "Cysteine",
        formula: "Csy",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Glutamine",
        formula: "Gln",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Glutamate",
        formula: "Glu",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Glycine",
        formula: "Gly",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Histidine",
        formula: "His",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Isoleucine",
        formula: "Ile",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Leucine",
        formula: "Leu",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Lysine",
        formula: "Lys",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Methionine",
        formula: "Met",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Phenylalanine",
        formula: "Phe",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Proline",
        formula: "Pro",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Serine",
        formula: "Ser",
        info: "Amino Acid",
        itemType: "Non Essential Amino Acids",
        userId
    }, {
        name: "Threonine",
        formula: "Thr",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Tryptophan",
        formula: "Trp",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Tyrosine",
        formula: "Tyr",
        info: "Amino Acid",
        itemType: "Semi Essential Amino Acids",
        userId
    }, {
        name: "Valine",
        formula: "Val",
        info: "Amino Acid",
        itemType: "Essential Amino Acids",
        userId
    }, {
        name: "Ethyl Alcohol",
        formula: "20:3 (n-6)",
        info: "Amino Acid",
        itemType: "Alcohol",
        userId
    }, {
        name: "Caffeine",
        formula: "20:3 (n-6)",
        info: "",
        itemType: "Alkaloid",
        userId
    }, {
        name: "Theobromine",
        formula: "20:3 (n-6)",
        info: "C27H46O",
        itemType: "Alkaloid",
        userId
    }]
    // const addI = await addItems(SFAs)   

     
     
     
     */