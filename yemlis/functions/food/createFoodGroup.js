import mongoose from 'mongoose'
import FoodGroups from '../../models/groups/foodGroups.js/index.js'

 export async function saveFoodAndChildren(args) {  // e.g. save fruits and citrus fruits etc.

    /* {
food: { name, foodId, parent, tags },
childrenFoods: [{ name, foodId, tags }] } */

    const food = args.food
    const childrenFoods = args.childrenFoods

    const fruitId = new mongoose.Types.ObjectId()
    let foodObject = {
        _id: fruitId,
        ...food
    }
       if (food.parent) {
        foodObject.parent = food.parent
    }
    let childrenObjects = []
    for (let i = 0; i < childrenFoods.length; i++) {
        const element = childrenFoods[i]
        const childFood = new { parent: fruitId, ...element }
        foodObject.children.push(childFood._id)
        childrenObjects.push(childFood)

    }
    const allFoods = [foodObject, ...childrenObjects]
   
    const saveAllFoods = await saveFoods(allFoods)

    return allFoods

}

async function saveFoods(foodObjs) {

    for (const foodObj of foodObjs) {
    

    console.log("foodObj")
    delete foodObj._id
    console.log(foodObj)
        const saveFoodObj = await FoodGroups.findOneAndUpdate({
            name:foodObj.name }
           ,foodObj,
           {upsert:true});
           
          }
}

export async function addFood(foodObj,parent) {
    let food = {...foodObj, children:[]}
    if(parent) food.parent = parent
    const add = await FoodGroups.create(food)
    if(add){
        return add
    }else{
        return new Error("Food could not be added")
    }

}
export async function addChildren(parentId, children) {
    const mongooseParentId = new mongoose.Types.ObjectId(parentId)
    let childrenFoods = children.slice() // prevent mutating
    childrenFoods.forEach(function (food) {
        food.parent = mongooseParentId;
      })
    console.log("childrenFoods") 
    console.log(childrenFoods)
    const addChildren = await FoodGroups.insertMany(childrenFoods)
    if(!addChildren){
        console.log("Add Children Error")
        return new Error("Add Children Error")
    } 
    console.log("addChildren")
    console.log(addChildren) 
    const childrenIds= addChildren.map(children=>(children._id))
   
    const updateParent = await FoodGroups.findOneAndUpdate({_id:mongooseParentId},{$push:{children:childrenIds}})
    if(!updateParent){
        console.log("Update Parent Error")
        new Error("Update Parent Error")

    }
    return "success"
}

export async function attachChildren(parent, child) { 
    const createFilter = (idorName) =>{
        const isValid = mongoose.isValidObjectId(idorName)
        const filter = {...(isValid?{_id:idorName}:{name:idorName})}
        return filter
    }   
    try {
        const parentFilter = createFilter(parent)
        const childFilter =  createFilter(child)
        const findParent = await FoodGroups.findOne(parentFilter)
        if(!findParent) throw Error('Parent Could not be Found')
        const findChild = await FoodGroups.findOne(childFilter)
        if(!findChild) throw Error('Child Could not be Found')
        const parentId = findParent._id
        const childId = findChild._id
        const parentUpdate ={$addToSet:{children:findChild._id}} 
        const childUpdate = {parent:findParent._id}
        
        const updateParent = await FoodGroups.findByIdAndUpdate(parentId,parentUpdate)
        if(!updateParent) throw Error('Parent Update Failed')
        const updateChild = await FoodGroups.findByIdAndUpdate(childId,childUpdate)
        if(!updateChild) throw Error('Child Update Failed')
        return "Children Attached"
    } catch (error) {
        console.log("Child Attach Error: ")
        console.log(error)
    }


}

export async function detachChildren(parent, child) { 
    const createFilter = (idorName) =>{
        const isValid = mongoose.isValidObjectId(idorName)
        const filter = {...(isValid?{_id:idorName}:{name:idorName})}
        return filter
    }   
    try {
        const parentFilter = createFilter(parent)
        const childFilter =  createFilter(child)
        const findParent = await FoodGroups.findOne(parentFilter)
        if(!findParent) throw Error('Parent Could not be Found')
        const findChild = await FoodGroups.findOne(childFilter)
        if(!findChild) throw Error('Child Could not be Found')
        const parentId = findParent._id
        const childId = findChild._id
        const parentUpdate ={$pull:{children:findChild._id}} 
        const childUpdate = {$unset:{parent:""}}
        
        const updateParent = await FoodGroups.findByIdAndUpdate(parentId,parentUpdate)
        if(!updateParent) throw Error('Parent Update Failed')
        const updateChild = await FoodGroups.findByIdAndUpdate(childId,childUpdate)
        if(!updateChild) throw Error('Child Update Failed')
        return "Children Detached"
    } catch (error) {
        console.log("Child Detach Error: ")
        console.log(error)
    }


}

export default {saveFoodAndChildren,addChildren,addFood, attachChildren,detachChildren}
//TODO ADD Single Food Group
//TODO REMOVE Single Food Group


/*     const saveFood = await saveFoodAndChildren({
        food: {
            name: "vegetables",
            foodId: 2,
            tags: ["vegetables", "vegetable", "sebze", "sebzeler"]
        }, childrenFoods: [{
            name: "Dark Green Vegetables",
            foodId: 36,
            tags: ["dark green", "vegetable", "koyu", "yapraklı", "sebzeler"]
        }, {
            name: "Red and Orange Vegatables",
            foodId: 37,
            tags: ["red", "orange", "vegetable", "kırmızı", "turuncu", "sebzeler"]
        },
        {
            name: "Starchy Vegatables",
            foodId: 38, tags: ["starchy", "vegatables", "nişastalı", "sebzeler"]
        }]

    })
    console.log("saveFood")
    console.log(saveFood)

      const saveFood = await saveFoodAndChildren({
        food: {
            name: "Meat and Poultry",
            foodId: 4,
            tags: ["meat", "poultry", "chicken", "et", "tavuk"]
        }, childrenFoods: [{
            name: "Red Meat",
            foodId: 11,
            tags: ["red meat", "kırmızı et"]
        }, {
            name: "Poultry",
            foodId: 12,
            tags: ["poultry", "kümes hayvanları"]
        },
        {
            name: "Gamy",
            foodId: 13, tags: ["gamy", "gamy", "hunt meat", "av eti", "orman eti"]
        }]

    }) 
    const saveFood = await saveFoodAndChildren({
        food: {
            name: "eggs",
            foodId: 3,
            tags: ["eggs", "egg", "yumurta", "yumurtalar"]
        }, childrenFoods: []

    })

     const saveFood = await saveFoodAndChildren({
        food: {
            name: "Fish&ShellFish",
            foodId: 5,
            tags: ["fish", "shellfish", "sea", "balık", "deniz mahsülleri", "kabuklu deniz ürünleri"]
        }, childrenFoods: [{
            name: "Fish",
            foodId: 15,
            tags: ["fish", "balık"]
        }, {
            name: "Shellfish",
            foodId: 16,
            tags: ["shellfish", "kabuklu ve yumuşakça deniz ürünleri"]
        }]

    })  

 */
/*      const saveFood = await saveFoodAndChildren({
        food: {
            name: "Fish&ShellFish",
            foodId: 5,
            tags: ["fish", "shellfish", "sea", "balık", "deniz mahsülleri", "kabuklu deniz ürünleri"]
        }, childrenFoods: [{
            name: "Fish",
            foodId: 15,
            tags: ["fish", "balık"]
        }, {
            name: "Shellfish",
            foodId: 16,
            tags: ["shellfish", "kabuklu ve yumuşakça deniz ürünleri"]
        }]
        console.log("saveFood")
        console.log(saveFood)
    })  */
/* 
    const parentFoodId= new mongoose.Types.ObjectId("6581c8eaf5e61055ad7b781b")
    const foods = [{ 
        name: "Crustaceans", foodId: 17, tags: ["crustaceans", "kabuklular"], children: [] },
        { name: "Mollusks", foodId: 18, tags: ["mollusks", "yumuşakçalar"], children: [] }]

    const addFoods = await createFoodGroup.addChildren("6581c8eaf5e61055ad7b781b",foods)
 */

    /* const saveFood = await createFoodGroup.saveFoodAndChildren({
        food: {
            name: "LegumesNutsSeeds",
            foodId: 7,
            tags: ["legumes", "nuts", "seeds"],
            children: []
        }, childrenFoods: [{
            name: "Legumes",
            foodId: 21,
            tags: ["legumes", "kurubaklagiller"],
            children: []
        },{
            name: "Lentils",
            foodId: 22,
            tags: ["lentils", "mercimek"],
            children: []
        },{
            name: "Peas",
            foodId: 23,
            tags: ["peas", "bezelye"],
            children: []
        }, {
            name: "BroadBeans",
            foodId: 24,
            tags: ["broad beans", "bakla"],
            children: []
        }, {
            name: "Chickpeas",
            foodId: 25,
            tags: ["chickpeas", "nohut"],
            children: []
        },{
            name: "Soybeans",
            foodId: 26,
            tags: ["soybeans", "soya fasulyesi"],
            children: []
        }, {
            name: "Beans",
            foodId: 27,
            tags: ["beans", "fasulye"],
            children: []
        }, {
            name: "Peanuts",
            foodId: 28,
            tags: ["peanuts", "fıstık"],
            children: []
        },
        {
            name: "Nuts",
            foodId: 29,
            tags: ["nuts"],
            children: []
        },{
            name: "Seeds",
            foodId: 30,
            tags: ["seeds"],
            children: []
        },]

    })
    console.log("saveFood")
    console.log(saveFood) */
    /*       const foods = [{ 
            name: "BroadBeans", foodId: 17, tags: ["crustaceans", "kabuklular"], children: [] },
            { name: "Chickpeas", foodId: 18, tags: ["mollusks", "yumuşakçalar"], children: [] },
            { name: "Soybeans", foodId: 18, tags: ["mollusks", "yumuşakçalar"], children: [] },
            { name: "Peanuts", foodId: 18, tags: ["mollusks", "yumuşakçalar"], children: [] },
            { name: "Nuts", foodId: 18, tags: ["mollusks", "yumuşakçalar"], children: [] },]
    
        const addFoods = await createFoodGroup.addChildren("6581de914ec0717b801c4d57",foods)
    
        console.log("Add Foods")
        console.log(addFoods)   */

        /* 
    const saveFood = await createFoodGroup.saveFoodAndChildren({
        food: {
            name: "Prepered Foods",
            foodId: 31,
            tags: ["prepered foods", "Yiyecek", "Hazırlanmış"],
            children: []
        }, childrenFoods: [{
            name: "Dish",
            foodId: 32,
            tags: ["dish","recipe", "yemek","tarif"],
            children: []
        },{
            name: "Processed Foods",
            foodId: 33,
            tags: ["Processed", "Foods","İşlenmiş","besinler","rafined","rafine"],
            children: []
        }]

    }) */

/*     const foods = [{
        name: "Sugar&Sugarproducts (Fabrication)", foodId: 37, tags: ["sugar", "sugar products", "şeker", "şekerli ürünler"], children: []
    },
    { name: "nonAlcoholicbeverages (Fabrication)", foodId: 38, tags: ["nonAlcoholic beverages fabrication", "alkolsüz içecekler"], children: [] },
    { name: "alcoholicbeverages (Fabrication)", foodId: 39, tags: ["alcoholic beverages fabrication", "alkollü içecekler"], children: [] },
    ]

    const addFoods = await createFoodGroup.addChildren("65830520f2609928d07f1de4", foods) */

    /*  const addFood = await createFoodGroup.addFood({
        name: "Water",
        foodId: 40,
        tags: ["Water", "Su"],
    })
    console.log("addFood")
    console.log(addFood)


    /*    
        const fruitId = new mongoose.Types.ObjectId()
   
           async function saveFoods (foodObjs) {
         
           for (const foodObj of foodObjs) {
             const saveFoodObj = await FoodGroups.create(foodObj);
             console.log("saveFoodObj");
             console.log(saveFoodObj);
           }
         }
       const fruits = new FoodGroups({
           _id:fruitId,
           name: "Fruit",
           foodId: 1,
           tags: ["fruit", "fruits", "meyve", "meyveler"],
           children: [],        
       }) */



    /*     const citrusFruits = new FoodGroups({ name: "Citrus Fruits", foodId: 31, parent: fruitId, tags: ["citrus", "fruits", "turunçgiller"], children: [] })
        const pomeFruits = new FoodGroups({ name: "Pome Fruits", foodId: 32, parent: fruitId, tags: ["pome", "fruits", "çekirdekli", "meyveler"], children: [] })
        const stoneFruits = new FoodGroups({ name: "Stone Fruits", foodId: 33, parent: fruitId, tags: ["stone", "fruits", "taş", "çekirdekli", "meyveler"], children: [] })
        const tropicalFruits = new FoodGroups({ name: "Tropical Fruits", foodId: 34, parent: fruitId, tags: ["tropical", "fruits", "tropikal", "meyveler"], children: [] })
        const berries = new FoodGroups({ name: "Berries", foodId: 35, parent: fruitId, tags: ["berries", "böğürtlengiller", "dutgiller"], children: [] })
    
        fruits.children=[citrusFruits._id, pomeFruits._id, stoneFruits._id, tropicalFruits._id, berries._id]
        const saveAllFoods = await saveFoods([fruits,citrusFruits, pomeFruits, stoneFruits, tropicalFruits, berries])
    
        console.log("saveAllFoods")
        console.log(saveAllFoods) */

    /*    const equivalentsId = new mongoose.Types.ObjectId("657f62870302b4a8a55757e3")
       const creator = {
           creator: userId,
       }
       const addUnit = await createUnit({
           name:"microgram",
           abbr:"mcg",
           type:"weight",
           unitEquivalents:equivalentsId,
           equals:0.001,
           creator:userId
       })
       console.log("addUnit")
       console.log(addUnit)  */
    /*  const equivalent = new mongoose.Types.ObjectId()
        const createUnit = new Unit({
            name:"miligram",
            abbr:"mg",
            type:"Weight"
    
        }) */
    /*      const createEquivalent = await createEquivalentandMainUnit({ // creates equivalents and it's first unit
            unitName:"calorie",
            unitAbbr:"cal",
            unitType:"energy",
            equivalentsName:"energy",
            creator:userId
        })
        console.log("createEquivalent")
        console.log(createEquivalent)  */


    //writeCategories(dietTypesCategories,creatorId)
    //   const cats = await writeCategories(dietTypesCategories, userId, false)
    //   const saveCats = await saveCategories(cats, userId)

    /* const getCats = await Categorie.find().getParents('Vegan')
    console.log("getCats")
    console.log(getCats) */




     