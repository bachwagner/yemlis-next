"use client"

const { useCurrentRole } = require("@/hooks/use-current-role")

export const RoleGate = ({ children, allowedRole }) => {
    const {role} = useCurrentRole()
    if (role !== allowedRole) {
        return (<>You Are Not Allowed</>)
    }else {
        return (<>{children}</>)
    }

}

 