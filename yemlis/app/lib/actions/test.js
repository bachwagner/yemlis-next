import unitEquivalent from "@/models/units/unitEquivalent"
import Account from "@/models/user/accounts"
import { ObjectId } from "mongodb"
export const test = async () => {
    
    try {
        const updateUE = await unitEquivalent.findOneAndUpdate({
            _id: "657f6bc7094fb583bc8ed796"
        }, {
            $push: {
                units: {
                    unit: new ObjectId("657f6bc7094fb583bc8ed794"),
                    equals: 1000
                }
            }
        }
        )
        console.log("updateUE")
        console.log(updateUE)
        return account
    } catch(error){
        console.log("updateUE error")
        console.log(error)
        return null
    }
}