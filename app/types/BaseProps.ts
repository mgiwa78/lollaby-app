import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

export interface BaseProps {
  navigation?: NavigationProp<ParamListBase>;
  route?: RouteProp<ParamListBase, string>;
}
