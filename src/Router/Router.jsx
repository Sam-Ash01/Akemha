import App from "../App"
import {HomePageRoute} from "../Routes/UserRoutes/HomePageRoute"
import {ServicesRoute} from "../Routes/UserRoutes/ServicesRoute"
import {AchievementsRoute} from "../Routes/UserRoutes/AchievementsRoute"
import {ContactRoute} from "../Routes/UserRoutes/ContactRoute"
import {GoalsRoute} from "../Routes/UserRoutes/GoalsRoute"
import {LogInRoute} from "../Routes/UserRoutes/LogInRoute"
import {SignUpRoute} from "../Routes/UserRoutes/SignUpRoute"
import {TestimonialsRoute} from "../Routes/UserRoutes/TestimonialsRoute"
import {VolunteerFormRoute} from "../Routes/UserRoutes/VolunteerFormRoute"
import {CampaignPageRoute} from "../Routes/UserRoutes/CampaignPageRoute"
import {ProgramPageRoute} from "../Routes/UserRoutes/ProgramPageRoute";
import {DonationChannelsRoute} from "../Routes/UserRoutes/DonationChannelsRoute";
import {NewsRoute} from "../Routes/UserRoutes/NewsRoute";
import {ReferBeneficiaryRoute} from "../Routes/UserRoutes/ReferBeneficiaryRoute";
import {AdminDashboardRoute} from "../Routes/AdminRoutes/AdminDashboardRoute"
import {ManageUsersRoute} from "../Routes/AdminRoutes/ManageUsersRoute";
import UserLayout from '../Layout/UserLayout';
import AdminLayout from '../Layout/AdminLayout';
import { SupportRoute } from "../Routes/UserRoutes/SupportRoute"

export const RouterProject = [
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            ...HomePageRoute,
            ...ServicesRoute,
            ...AchievementsRoute,
            ...ContactRoute,
            ...GoalsRoute,
            ...LogInRoute,
            ...SignUpRoute,
            ...TestimonialsRoute,
            ...VolunteerFormRoute,
            ...CampaignPageRoute,
            ...ProgramPageRoute,
            ...DonationChannelsRoute,
            ...NewsRoute,
            ...ReferBeneficiaryRoute,
            ...SupportRoute,
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            ...AdminDashboardRoute,
            ...ManageUsersRoute
        ],
    },
]