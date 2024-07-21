import ApiClient from "./apiClient.js";
import {onSubmitForm, searchFilter} from "./utils.js";


ApiClient('/all', 'GET', '', result => {
    let places = result.places.filter(res => {
        return res.name !== null
    })

    let buildings = result.buildings.filter(res => {
        return res.name !== null
    })

    const data = [...places.map(res => res.name), ...buildings.map(res => res.name)]

    searchFilter("searchInputFrom", "dropdownListFrom", data)
    searchFilter("searchInputTo", "dropdownListTo", data)

}, resError => {
    console.log(resError)
})

onSubmitForm('/all/route', 'form')


