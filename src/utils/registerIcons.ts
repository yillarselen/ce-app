import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
  fas,
} from "@fortawesome/free-solid-svg-icons";

export default function registerIcons() {
  library.add(fas, faEye, faAngleLeft, faAngleRight);
}
