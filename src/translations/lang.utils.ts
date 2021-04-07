import fr from "./fr"
import en from "./en"

const supportedLanguages = [
    "en",
    "fr"
]

const getTranslation = (lang: string) => {
    switch (lang) {
        case "fr":
            return fr

        default:
            return en
    }
}

export {
    supportedLanguages,
    getTranslation
}