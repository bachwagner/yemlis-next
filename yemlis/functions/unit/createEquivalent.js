import mongoose from 'mongoose'
import Categorie from '../../models/groups/categorie.js'
import Unit from '../../models/units/unit.js'
import UnitEquivalent from '../../models/units/unitEquivalent.js'
import unit from '../../models/units/unit.js'

export async function createEquivalentandMainUnit({ // creates equivalents and it's first unit
    unitName,
    unitAbbr,
    unitType,
    equivalentsName,
    equivalentsMainUnit, //
    equivalentsUnits, //
    creator,
    equals
}) {

    try {
        const mainUnit = createMainUnit({ name: unitName, abbr: unitAbbr, type: unitType, creator })
        const equivalent = createEquivalent({ name: equivalentsName, units: equivalentsUnits, mainUnit: equivalentsMainUnit, creator })

        const checkEquivalentExist = await UnitEquivalent.findOne({ name: equivalentsName })

        if (checkEquivalentExist === null) { // equivalent is not exist
            const createEquivalent = await UnitEquivalent.findOneAndUpdate({
                name: equivalentsName
            }, {
                ...equivalent
            }, { new: true, upsert: true })
            console.log(createEquivalent)
            if (!createEquivalent) throw new Error("Creating Equivalent is Unsuccesfull")
            mainUnit.unitEquivalents = createEquivalent._id
            const createUnit = await Unit.findOneAndUpdate({
                name: unitName,
            }, {
                ...mainUnit,
            }, { new: true, upsert: true })
            console.log("createUnit")
            console.log(createUnit)
            equivalent.mainUnit = createUnit._id
            equivalent.units = [...createEquivalent.units, createUnit._id]
            const updateEquivalent = await UnitEquivalent.findOneAndUpdate({
                name: equivalentsName
            }, {
                mainUnit: equivalentsMainUnit ? equivalentsMainUnit : createUnit._id,
                $addToSet: { units: { unit: createUnit._id, equals: 1 } }
            }, { upsert: true })
        } else {
            const checkMainUnit = checkEquivalentExist.mainUnit  //_id
            console.log("checkMainUnit")
            console.log(checkMainUnit)
            console.log("Equivalent Exist, It's Main Unit is ", checkMainUnit)
            if (!checkMainUnit) { //Equivalent exist but its main unit is missing
                const addMainUnit = await Unit.findOneAndUpdate({
                    name: mainUnit.name
                }, {
                    ...mainUnit
                }, { new: true, upsert: true })
                console.log("main unit")
                console.log(checkMainUnit)
                if (!addMainUnit) return "Equivalent is Already Exists but missing main unit cannot be added"
                return addMainUnit

            } else { // equivalent and main  unit exists, update them
                const updateEquivalent = await UnitEquivalent.findOneAndUpdate({
                    name: equivalentsName
                }, {
                    ...equivalent
                }, { new: true, upsert: true })
                mainUnit.unitEquivalents = updateEquivalent._id
                if (!updateEquivalent) throw new Error("Equivalent Update is Unsuccessful")
                const updateUnit = await Unit.findOneAndUpdate({ name: unitName }, {
                    ...mainUnit
                }, { new: true, upsert: true })
                if (!updateUnit) throw new Error("Main Unit Update is Unsuccessful")
                console.log("hi")
                const updateEquivalentsUnit = await UnitEquivalent.findOneAndUpdate({
                    name: equivalentsName
                }, {
                    mainUnit: equivalentsMainUnit ? equivalentsMainUnit : updateUnit._id,
                    $addToSet: { units: { unit: updateUnit._id, equals: equals ? equals : 1 } }
                }, { new: true, upsert: true })
                console.log("updateEquivalentsUnit")
                console.log(updateEquivalentsUnit)

                if (!updateEquivalentsUnit) throw new Error("Update Equivalents Unit is Unsuccessful")

            }
            return "Equivalent is Already Exists"
        }
    } catch (error) {
        console.log("Add Equivalent and It's main Unit Error")
        console.log(error)
        return error
    }

    /* mainUnit.unitEquivalents = equivalent._id
    equivalent.mainUnit = equivalentsMainUnit ? equivalentsMainUnit : mainUnit._id
    equivalent.units = equivalentsUnits ? equivalentsUnits : [{ unit: mainUnit._id, equals: 1 }]  // [{unit:id,equals:number}]   equals:1 because its main unit and refers itself

    const saveEquivalents = await equivalent.save()
    const saveUnit = await mainUnit.save()
    console.log(saveEquivalents)
    console.log(saveUnit)
    return equivalent */
}
const createMainUnit = ({ name, abbr, type, unitEquivalents, creator }) => {
    const unit = {
        name,
        abbr,
        type,
        unitEquivalents,
        creationInfos: { creator },

    }
    if (unitEquivalents && unitEquivalents !== null) unit.unitEquivalents = unitEquivalents

    return unit
}

const createEquivalent = ({ name, mainUnit, units, creator }) => {

    const equivalents = {
        name,
        creationInfos: { creator },
    }     // equivalent array [mg,gr,kg ..]
    if (mainUnit && mainUnit !== null) equivalents.mainUnit = mainUnit
    equivalents.units = units ? units : [] //TO CHECK

    return equivalents


}
export async function createUnit({ name, abbr, type, unitEquivalents, equals, creator }) {
    try {
        const checkUnitExist =  await Unit.findOne({name})
        const unit = await Unit.findOneAndUpdate ({
            $or: [{ name }, { abbr }] 
        }, {
            name, abbr, type, unitEquivalents, equals, creationInfos: { creator }
        }, { new:true, upsert: true })
       
        console.log("isNewUnit") 
        console.log(unit)
        
        if (!unit) throw new Error("Unit Cannot be Created")
             
        const unitEquals = {    
                unit: unit._id, 
                equals 
            } 
            console.log("unit id")
            console.log(unit._id)
            const addToEquivelents = await UnitEquivalent.findOneAndUpdate({
                _id: unitEquivalents,
                "units.unit":{$ne:unit._id}
            }, {
                $addToSet: { units: unitEquals }
            })
            console.log("addToEquivelents")
            console.log(addToEquivelents) 
            if (!addToEquivelents && !checkUnitExist) {
                throw new Error("addToEquivelents update error")

            }
             
            return unit
        
    } catch (error) {
        console.log(error)
        return error
    }


}
export async function deleteUnit() {
    //TODO
}
/* const createEquivalent = await createEquivalentandMainUnit({ // creates equivalents and it's first unit
        unitName:"gram",
        unitAbbr:"gr",
        unitType:"weight",
        equivalentsName:"weights",
        creator:userId
    })
    console.log("createEquivalent")
    console.log(createEquivalent) */
// equivalent array [mg,gr,kg ..]

/* 
    const createEM = await createEquivalentandMainUnit({
    unitName: "Dietary Folate Equivalent (Folate)",
    unitAbbr: "DFE Folate",
    unitType: "unit",
    equivalentsName: "Dietary Folate Equivalents",
    creator: userId,
    equivalentsMainUnit:mcg,
    equals:1 

})       

       const addMcg = await createUnit({
        name: "Dietary Folate Equivalent (Folic Acid)",
        abbr: "DFE-Folic Acid",  
        unitEquivalents: folateEquivalent, 
        equals:0.6,
        creator:userId
    })    
*/