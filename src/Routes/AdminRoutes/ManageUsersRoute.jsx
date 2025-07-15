import ManageUsers from "../../Pages/Admin/ManageUsers/ManageUsers";
import { PATHES } from "../../Const/Pathes";

export const ManageUsersRoute = [
    {
        path: PATHES.ADMINDASHBOARD,
        element: <ManageUsers/>,
    },
];
