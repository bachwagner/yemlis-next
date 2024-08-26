import mongoose from 'mongoose'

// "ScientificName", "Kingdom", "Division", "class", "order", "family", "genus", "type", "lifecycle"
const foodCategorie = mongoose.Schema({ //Scientific Categorie+value
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
    },
    isYemlisCustom: {
        type: Boolean,
        default: false,
    },
    scientificName: {
        minLength: [3, "too short scientificName length"],
        maxLength: [60, "too long scientificName length"]
    },
    kingdom: {
        minLength: [3, "too short kingdom length"],
        maxLength: [60, "too long kingdom length"]
    },
    division: {
        minLength: [3, "too short division length"],
        maxLength: [60, "too long division length"]
    },
    class: {
        minLength: [3, "too short division length"],
        maxLength: [60, "too long division length"]
    },
    order: {
        minLength: [3, "too short order length"],
        maxLength: [60, "too long order length"]
    },
    family: {
        minLength: [3, "too short family length"],
        maxLength: [60, "too long family length"]
    },
    genus: {
        minLength: [3, "too short genus length"],
        maxLength: [60, "too long genus length"]
    },
    type: {
        minLength: [3, "too short type length"],
        maxLength: [60, "too long type length"]
    },
    lifecycle: {
        minLength: [3, "too short lifecycle length"],
        maxLength: [60, "too long lifecycle length"]
    },

    creationInfos: {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            createdAt: {
                type: Date,
                default: () => Date.now()

            },
            updatedAt: {
                type: Date,
                default: () => Date.now()

            },
            isAccepted: {
                type: Boolean,
                default: false,
            },
            editors: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }]

        },
        editInfos: {  // !TODO for limitation
            editHistory: {
                edits: [Object],

 
            }
        } 
    }
})

export default mongoose.models?.FoodCategorie  || mongoose.model('FoodCategorie', foodCategorie)

