import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const DecodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return DecodedToken.id

    } catch (error: any) {
        throw new Error(error.message)
    }
}