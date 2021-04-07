/*
 * Types definitions
 */
type AppConfigurationState = {
    theme: string,
    lang: string,
    messages: Record<string, string>
}

type AppConfigurationAction =
    | { type: "SWITCH_LANG" | "SWITCH_THEME", payload: string }


/*
 * Interface definitions
 */
declare interface Window {
    [key: string]: any;
}
