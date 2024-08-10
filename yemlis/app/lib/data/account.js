import Account from "@/models/user/accounts"
export const getAccountByUserId = async (userId) => {
    console.log("userId")
    console.log(userId)
    try{
        const account = await Account.findOne({userId: userId})
        return account
    }catch{
        return null
    }
}