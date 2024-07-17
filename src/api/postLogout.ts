import { apiRoutes } from "@/_lib/apiRoutes"
import { fetchData } from "@/_lib/axios"

export const postLogout = async() => {
    return await fetchData('POST', apiRoutes.logout);
}