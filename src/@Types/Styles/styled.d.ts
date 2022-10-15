import "styled-components";
import { blackTheme } from "../../Styles/themes/blackTheme";

type ThemeType = typeof blackTheme;

declare module "styled-components" {
    export interface DefaultTheme extends ThemeType {}
}