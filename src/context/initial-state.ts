import { fetchRole, fetchUser } from "@/hooks/fetch-local-storage-data";

const userInfo = fetchUser();
const userRole = fetchRole();

const initialState = {
    user: userInfo,
    role: userRole,
}

export default initialState