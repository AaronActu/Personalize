import React, { Suspense, useEffect, useReducer } from 'react';
import './style/bootstrap.css';
import './style/themes.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

/*
 * Language import
 */
import { supportedLanguages, getTranslation } from "./translations/lang.utils"
import { IntlProvider } from 'react-intl'

/*
 * Screens Lazy Import
 */
const HomeScreen = React.lazy(() => import("./screens/Home/Home"))

const SuspenseFallback = () => (<p>Loading...</p>)

const initAppConfiguration = (): AppConfigurationState => {
    const userLang = navigator.language.substring(0, 2)

    return {
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
        lang: supportedLanguages.includes(userLang) ? userLang : "en",
        messages: {}
    }
}

const appConfigurationReducer = (state: AppConfigurationState, action: AppConfigurationAction): AppConfigurationState => {
    switch (action.type) {
        case "SWITCH_THEME":
            if (["light", "dark"].includes(action?.payload)) {
                document.body.classList.remove(`theme-${state.theme}`)
                document.body.classList.add(`theme-${action.payload}`)
                return { ...state, theme: action.payload }
            } else throw new Error(`Theme '${action.payload}' not supported`)

        case "SWITCH_LANG":
            if (supportedLanguages.includes(action?.payload)) {
                return { ...state, messages: getTranslation(action.payload) }
            } else throw new Error(`Language '${action.payload}' not supported`)


        default:
            throw new Error(`Action type '${action.type}' is not handled`)
    }
}

function App() {
    const defaultAppConfiguration: AppConfigurationState = { theme: "", lang: "", messages: {} }
    const [appConfiguration, dispacthAppConfiguration] = useReducer(appConfigurationReducer, defaultAppConfiguration, initAppConfiguration)

    useEffect(() => {
        dispacthAppConfiguration({ type: "SWITCH_LANG", payload: appConfiguration.lang })
        dispacthAppConfiguration({ type: "SWITCH_THEME", payload: appConfiguration.theme })

    }, [])

    return (
        <IntlProvider messages={appConfiguration.messages} locale={appConfiguration.lang} defaultLocale="en">
            <Router>
                <Switch>
                    <Suspense fallback={<SuspenseFallback />}>
                        <Route path="/home" exact component={() => <HomeScreen />} />
                        <Route render={() => <><Redirect to="/home" /></>} />
                    </Suspense>
                </Switch>
            </Router >
        </IntlProvider>
    )
}

export default App;
