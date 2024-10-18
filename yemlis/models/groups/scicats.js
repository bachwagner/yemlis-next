import mongoose  from 'mongoose'
import {ObjectId} from 'mongoose'
import creationInfos from './schemas.js'
//WORKS

function Categories({ name, id, parentId, children }) {
    this.name = name
    this.id = id
    this.parentId = parentId
    this.children = children


}
const species = new Categories({ name: "type", id: 6, parentId: 5, children: [] })
const genus = new Categories({ name: "genus", id: 5, parentId: 4, children: [species] })
const family = new Categories({ name: "family", id: 4, parentId: 3, children: [genus, species] })
const order = new Categories({ name: "order", id: 3, parentId: 2, children: [family, genus, species] })
const classname = new Categories({ name: "classname", id: 2, parentId: 1, children: [order, family, genus, species] })
const division = new Categories({ name: "division", id: 2, parentId: 1, children: [classname, order, family, genus, species] }) // or Phylum
const kingdom = new Categories({ name: "kingdom", id: 1, parentId: 0, children: [division, classname, order, family, genus, species] })
const creatures = new Categories({ name: "creatures", id: 0, parentId: 0, children: [kingdom, division, classname, order, family, genus, species] })

function categorieEnums(creatures) { //gets creatures titles
    let enums = []

    function getTitle(obj) {
        let title = obj.name
        // console.log("obj title")
        // console.log(title)
        enums.push(title)
        if (obj.children && obj.children.length > 0) {
            for (let i = 0; i < obj.children.length; i++) {
                const element = obj.children[i].name;
                enums.push(element)
            }
        }
    }
    getTitle(creatures)
    console.log(enums)
    return enums
}
const sciEnums = categorieEnums(creatures)
// "ScientificCategories", "creatures","Kingdom", "Division", "class", "order", "family", "genus", "type", "lifecycle"

const sciCats = mongoose.Schema({ //Scientific Categorie+value
    name: {
        type: String,
        minLength: [3, "too short sci categories name length"],
        maxLength: [50, "too long sci categories name length"],
        required: true,
    },
    common: {
        type: String,
        minLength: [3, "too short sci categories common name length"],
        maxLength: [255, "too long sci categories common name length"],
    },
    category: {
        type: String,
        enum: {
            values: sciEnums,
            message: "Unvalid sci category",
        },
        minLength: [3, "too short sci category length"],
        maxLength: [30, "too long sci category length"],
        required: true,
    },
    categoryId: {
        type: Number,
        required: true,
        min: [0, "too shot category id"],
        max: [20, "too long category id"],
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sciCat'
    },
    creationInfos,
    infos: {
        type: String,
        minLength: [1, "too short info length"],
        maxLength: [500, "too long info length"]

    }
})
//find by name   name:"animals, plantae" => gets scicats by name
sciCats.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};
//find by categories   category:"division" => gets divisions 
//pure=> return just name

sciCats.query.byCategory = async function (category, pure) {
    if (pure) {
        return await this.where({ category: new RegExp(category, 'i') }).select('name -_id');

    } else {
        return await this.where({ category: new RegExp(category, 'i') });

    }
};
sciCats.query.getParents = async function (name, pure) {
    // const categorie = await this.findOne({name})
    let parents = []
    const model = this.model
    const categoryObj = await model.findOne({ name }).populate('parent')
    parents.push(categoryObj.parent.name)

    async function getParents(categoryObj, pure) {
        console.log("finding parent")
        console.log(categoryObj.parent.name)
        const parent = await model.findOne({ name: categoryObj.parent.name }).populate('parent')
        if (parent.parent) {
            parents.push(parent?.parent?.name)
            await getParents(parent)
        } else {
            console.log("no more parents")
            return parent
        }
    }

    if (categoryObj.parent) {
        await getParents(categoryObj)
    } else {
        return []

    }

    return parents


};

sciCats.query.getChildren = async function (name, limit, pure) {
    const model = this.model
    const categoryObj = await model.findOne({ name }) // this.model part is to prevent  "Query was already executed: sciCat.find({"" error
    const setLimit = limit ? limit : 0
    const setSelect = pure ? 'name -_id' : ''
    async function getChildren() {
        if (categoryObj) {
            const children = await model.find({ parent: new ObjectId(categoryObj._id) }).select(setSelect).limit(setLimit)
            return children
        } else {
            console.log("no child")
            return []
        }
    }
    return await getChildren()
}
sciCats.methods.findSimilarTypes = async function () {
    const similars = await mongoose.model('sciCat').find({ category: this.category });
    console.log("methods")

    return similars
};

const SciCats = mongoose.models?.SciCats || mongoose.model("SciCats", sciCats)
export default SciCats


