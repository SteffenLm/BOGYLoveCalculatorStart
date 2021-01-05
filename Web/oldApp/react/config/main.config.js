import { isDevelop } from "../js/helper/util";

export default {
    BASE_URL: isDevelop() ? 'http://localhost:3000/' : 'http://localhost:3000/',
    BASE_URL_API: isDevelop() ? 'http://localhost:3000/api/' : 'http://localhost:3000/api/',
    ARTICLE_CATEGORIES:  [
        { key: 0, text: 'Kleinmaschine', value: "Kleinmaschine" },
        { key: 1, text: 'Sets', value: "Sets" },
        { key: 2, text: 'Garten', value: "Garten" },
        { key: 3, text: 'Reinigung', value: "Reinigung" }
    ]

}