
import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'


const itemTypes = new mongoose.Schema({
    name: { // element, mineral, vitamin
        type: String,
        minLength: [1, "Too Short Unit Type Name"],
        maxLength: [50, "Too Long Unit Type Name"],
        required: [true, "Unit Type Name is Required"],
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'ItemTypes'
    },
    children: [{
        type: mongoose.Types.ObjectId,
        ref: 'ItemTypes'
    }],
    info: {
        type: String,
        minLength: [1, "Too Short Unit Type Info "],
        maxLength: [200, "Too Long Unit Type Info"],
    },
    structureFeature: [{ //organic, inorganic
        type: String,
        minLength: [1, "Too Short Feature Name"],
        maxLength: [50, "Too Long Feature Name"],
    }],
    creationInfos
}
)


const ItemTypes = mongoose.models?.ItemTypes || mongoose.model("ItemTypes", itemTypes)
export default ItemTypes
/*  const addITs = await addItemTypes([{
        name: "Protein",
        info: "Common Protein ",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Lipids",
        info: "Common Lipids",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Carbohydrates",
        info: "Common Carbohydrates",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Vitamins",
        info: "Common Vitamins",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Fibers",
        info: "Common Fibers",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Enzyme",
        info: "Common Enzyme",
        parent: organicCompounds,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Elements",
        info: "Common Elements",
        structureFeature: ["Inorganic"],
        userId
    },])

    const editC = await editChild({itemType:"Organic Compounds",child:"Enzyme"})
    
    console.log("editC")
    console.log(editC) */


    /* 
    const lipids = new mongoose.Types.ObjectId("658f0655db9dd557d9f027df")
    const glycerolBasedLipids = new mongoose.Types.ObjectId("6590858ddb9dd557d9f03810")
    const nonGlycerolBasedLipids = new mongoose.Types.ObjectId("6590858ddb9dd557d9f03816")
    const simpleLipids = new mongoose.Types.ObjectId("65908664db9dd557d9f038b7")
    const compoundLipids = new mongoose.Types.ObjectId("65908664db9dd557d9f038bd")
    const fatsandOils = new mongoose.Types.ObjectId("6590872bdb9dd557d9f03956")
    const glycolipids = new mongoose.Types.ObjectId("6590872bdb9dd557d9f0395c")
    const phospholipids = new mongoose.Types.ObjectId("6590872bdb9dd557d9f0395f")
    const saturatedLipids = new mongoose.Types.ObjectId("659088dbdb9dd557d9f03a8f")
    const unSaturatedLipids =new mongoose.Types.ObjectId("659088dbdb9dd557d9f03a95")
      const carbohydrates = new mongoose.Types.ObjectId("658f0655db9dd557d9f027e2")

    const addITs = await addItemTypes([{
        name: "Glycerol Based Lipids",
        info: "Common Phospholipids",
        parent: lipids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "NonGlycerol Based Lipids",
        info: "waxes, cerebrosides etc.",
        parent: lipids,
        structureFeature: ["Organic"],
        userId
    }])
      const addITs = await addItemTypes([{
        name: "Simple Lipids",
        info: "Glycerol Based Lipids group, simple fats",
        parent: glycerolBasedLipids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Compound Lipids ",
        info: "Glycerol Based  compound lipids.",
        parent: glycerolBasedLipids,
        structureFeature: ["Organic"],
        userId
    }])

         const addITs = await addItemTypes([{
        name: "Fats and Oils",
        info: "Glycerol Based simple Lipids",
        parent: simpleLipids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Glycolipids",
        info: "Glycolipids: Glycerol Based compound lipid.",
        parent: compoundLipids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Phospholipids",
        info: "Phospholipids: Glycerol Based compound lipid.",
        parent: compoundLipids,
        structureFeature: ["Organic"],
        userId
    },])
 const addITs = await addItemTypes([{
        name: "Saturated Faty Acids",
        info: "Saturated Faty Acids: Glycerol Based Saturated Lipids",
        parent: fatsandOils,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Unsaturated Fatty Acids",
        info: "Unsaturated Fatty Acids: Glycerol Based Unsaturated Lipids.",
        parent: fatsandOils,
        structureFeature: ["Organic"],
        userId
    }])
  const addITs = await addItemTypes([{
        name: "Essential  Amino Acids",
        info: "Essential  Amino Acids",
        parent: proteins,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Non Essential Amino Acids",
        info: "Non Essential Amino Acids",
        parent: proteins,
        structureFeature: ["Organic"],
        userId 
    },{
        name: "Semi Essential Amino Acids",
        info: "Semi Essential Amino Acids",
        parent: proteins,
        structureFeature: ["Organic"],
        userId
    }]) 
     const essentialAminoacids = new mongoose.Types.ObjectId("659190a1db9dd557d9f03ccf")
    const nonEssentialAminoacids = new mongoose.Types.ObjectId("659190a1db9dd557d9f03cd5")
    const semiEssentialAminoacids = new mongoose.Types.ObjectId("659190dbdb9dd557d9f03d25")

     const addITs = await addItemTypes([{
        name: "Monosaccharides",
        info: "Essential  Amino Acids",
        parent: carbohydrates,
        structureFeature: ["Organic"],
        userId
    }, {
        name: "Disaccharides",
        info: "Non Essential Amino Acids",
        parent: carbohydrates,
        structureFeature: ["Organic"],
        userId 
    },{
        name: "Complex Carbohydrates",
        info: "Semi Essential Amino Acids",
        parent: carbohydrates,
        structureFeature: ["Organic"],
        userId
    }])

      const Items = [{
        name: "Mono Unsaturated Fatty Acids",
        info: "Mono Unsaturated Fatty Acids",
        parent:unSaturatedFattyAcids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Poly Unsaturated Fatty Acids",
        info: "Poly Unsaturated Fatty Acids",
        parent:unSaturatedFattyAcids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Trans Fats",
        info: "Trans Fats",
        parent:lipids,
        structureFeature: ["Organic"],
        userId
    },]
    const addI = await addItemTypes(Items)
    */