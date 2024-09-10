//DONE

import mongoose from 'mongoose'
import creationInfos from './schemas.js'
const foodGroups = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minLength: [1, 'too short food group name'],
        maxLength: [80, 'too long food group name']
    },
    text: {
        type: String,
        minLength: [1, 'too short food group text'],
        maxLength: [255, 'too long food group text']
    },
    foodId: {
        type: Number,
        min: [0, "too short foodGroup foodId"],
        max: [9999, "too long foodGroup foodId"],
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodGroups"
    },
    tags: {
        type: [String],
        required:true,
        maxLength: [30, "too many foodGroups tags"]
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'foodGroups' }],
    creationInfos 

}) 

const FoodGroups = mongoose.models?.FoodGroups || mongoose.model("FoodGroups", foodGroups)
export default FoodGroups


/*  const mainFoodGroups = [
    {
        name: "fruits",
        parent: true,
        tags: ["fruit", "fruits", "meyve", "meyveler"],
        children: [{
            name: "Pome Fruits",
            tags: ["pome", "fruits", "çekirdekli", "meyveler"],
            children: [],
        }, {
            name: "Citrus Fruits",
            tags: ["citrus", "fruits", "turunçgiller"],
            children: [],
        }, {
            name: "Stone Fruits",
            tags: ["stone", "fruits", "taş", "çekirdekli", "meyveler"],
            children: [],
        },
        {
            name: "Tropical Fruits",
            tags: ["tropical", "fruits", "tropikal", "meyveler"],
            children: [],
        },
        {
            name: "Berries",
            tags: ["berries", "böğürtlengiller", "dutgiller"],
            children: [],
        },
        ],

    },
    {
        name: "vegetables",
        parent: true,
        tags: ["vegetables", "vegetable", "sebze", "sebzeler"],
        children: [{
            name: "Dark Green Vegetables",
            tags: ["dark green", "vegetable", "koyu", "yapraklı", "sebzeler"],
            children: [],
        }, {
            name: "red and orange vegatables",
            tags: ["red", "orange", "vegetable", "kırmızı", "turuncu", "sebzeler"],
            children: [],
        }, {
            name: "starchy vegatables",
            tags: ["starchy", "vegatables", "nişastalı", "sebzeler"],
            children: [],
        },],
    },
    {
        name: "eggs",
        parent: true,
        tags: ["eggs", "egg", "yumurta", "yumurtalar"],
        children: [],
    },
    {
        name: "meat-poultry",
        parent: true,
        tags: ["meat", "poultry", "chicken", "et", "tavuk"],
        children: [{
            name: "red meat",
            tags: ["red meat", "kırmızı et"],
            children: [],
        }, {
            name: "poultry",
            tags: ["poultry", "kümes hayvanları"],
            children: [],
        }, {
            name: "gamy",
            tags: ["gamy", "hunt meat", "av eti", "orman eti"],
            children: [],
        },],

    },
    {
        name: "fish shellfish",
        parent: true,
        tags: ["fish", "shellfish", "sea", "balık", "deniz mahsülleri", "kabuklu deniz ürünleri"],
        children: [{
            name: "balık",
            tags: ["fish", "balık"],
            children: [{
                name: "sea fish",
                tags: ["sea", "ocean", "fish"],
                children: [],
            }, {
                name: "fresh water fish",
                tags: ["fresh", "water", "fish", "lake"],
                children: [],
            },]
        }, {
            name: "shellfish",
            tags: ["shellfish", "kabuklu deniz ürünleri"],
            children: [{
                name: "crustaceans",
                tags: ["crustaceans", "kabuklular"],
                children: [],
            }, {
                name: "mollusks",
                tags: ["mollusks", "yumuşakçalar"],
                children: [],
            }],
        }],
    },
    {
        name: "fats-oils",
        parent: true,
        tags: ["fats", "oils"],
        children: [{
            name: "vegetable oils",
            tags: ["vegetable", "oils"],
            children: [],
        }, {
            name: "animal fats",
            tags: ["animal", "fats"],
            children: [],
        }

        ],

    },
    {
        name: "legumes-nuts-seeds",
        parent: true,
        tags: ["legumes", "nuts", "seeds"],
        children: [{
            name: "legumes",
            tags: ["legumes", "kurubaklagiller"],
            children: [{
                name: "Lentils",
                tags: ["lentils", "mercimek"],
                children: [],
            }, {
                name: "Peas",
                tags: ["peas", "bezelye"],
                children: [],
            }, {
                name: "Broad beans",
                tags: ["broad beans", "bakla"],
                children: [],
            }, {
                name: "Chickpeas",
                tags: ["chickpeas", "nohut"],
                children: [],
            }, {
                name: "Soybeans",
                tags: ["soybeans", "soya fasulyesi"],
                children: [],
            }, {
                name: "Beans", //lima, common
                tags: ["beans", "fasulye"],
                children: [],
            }, {
                name: "Peanuts",
                tags: ["peanuts", "fıstık"],
                children: [],
            },],
        }, {
            name: "nuts",
            tags: ["nuts"],
            children: [],
        },
        {
            name: "seeds",
            tags: ["seeds"],
            children: [],
        }

        ],

    },
    {
        name: "sugar-sugarproducts",
        parent: true,
        tags: ["sugar", "sugarproducts", "şeker", "şeker ürünleri"],
        children: [],
    },
    {
        name: "nonalcoholicbeverages",
        parent: true,
        tags: ["nonalcoholic", "beverages", "alkolsüz", ",içecekler"],
        children: [],
    },
    {
        name: "alcoholicbeverages",
        parent: true,
        tags: ["alcoholic", "beverages", "alkollü", "içecekler"],
        children: [],
    },
]
 const mainDishGroups = [
    {
        name: "packaged foods",
        parent: true,
        tags: ["packaged foods", "packaged", "prepared", "hazır", "paketli", "gıdalar"],
        children: [{
            name: "canned foods",
            tags: ["canned foods", "canned", "hazır", "paketli", "gıdalar", "konserve"],
            children: [],
        }, {
            name: "ready to eat",
            tags: ["ready to eat", "yemeye", "hazır", "paketli", "gıdalar"],
            children: [],
        }, {
            name: "deserts",
            tags: ["packaged foods", "packaged", "prepared", "dessert", "hazır", "paketli", "gıdalar", "tatlı"],
            children: [],
        },
        {
            name: "pastry",
            tags: ["packaged foods", "packaged", "prepared", "pastry", "hazır", "paketli", "gıdalar", "hamur işi"],
            children: [],
        }, {
            name: "snacks",
            tags: ["packaged foods", "packaged", "prepared", "snacks", "hazır", "paketli", "gıdalar", "atıştırmalık"],
            children: [],
        },
        ],

    },
]
 */
