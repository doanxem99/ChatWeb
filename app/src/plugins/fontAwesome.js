import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faCircleUser,
    faCircleInfo,
    faGear,
    faRightFromBracket,
    faBars,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

import { 
    faGithub,
    faFacebook,
    faGoogle
} from "@fortawesome/free-brands-svg-icons";

library.add(
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faGithub,
    faFacebook,
    faGoogle,
    faCircleUser,
    faCircleInfo,
    faGear,
    faRightFromBracket,
    faBars,
    faMagnifyingGlass
);

export default FontAwesomeIcon;