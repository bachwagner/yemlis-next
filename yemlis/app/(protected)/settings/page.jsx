import { auth, signOut } from "@/auth"
import { Button } from "@mui/material"
const SettingsPage = async () => {
    const session = await auth()
    console.log("session")
    console.log(session)
    return (
        <div>
            {JSON.stringify(session)}
            <form action={async()=>{
                "use server"
                await signOut({redirectTo:"/auth/login"})
            }}>
                <Button type="submit" >
                Çıkış
                </Button>
            </form>
        </div>
    )
}

export default SettingsPage