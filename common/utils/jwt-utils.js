import crypto from "crypto"
import { raw } from "express"

const generatteResetToken = ()=>{
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hasheToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex")

    return {rawToken, hasheToken}
}

export {
    generatteResetToken
}