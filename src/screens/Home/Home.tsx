import React, { useEffect, useRef, useState } from 'react'
import "../../style/Home.css"
import { Container, Input } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

const getURLSuggestion = (query: string) => {
    const script = document.createElement('script'),
        callbackMethod: string = "suggests"

    script.src = `https://corsanywhere.herokuapp.com/https://www.google.com/complete/search?client=chrome&jsonp=${callbackMethod}&q=${query}`

    document.body.appendChild(script)

    window[callbackMethod] = (data: any): any => {
        delete window[callbackMethod]
        document.body.removeChild(script)

        let result = []
        for (let i = 0; i < data[4]["google:suggesttype"].length; i++) {
            const type = data[4]["google:suggesttype"][i]
            if (type === "NAVIGATION")
                result.push({
                    value: data[1][i],
                    label: data[1][i]
                })
        }
        return result
    }
}

const HomeScreen = () => {
    const [search, setSearch] = useState<string>("")

    document.addEventListener("keyup", (e) => {
        if (e.key === "Enter") window.location.href = "https://www.google.com/search?q=" + search
    })

    useEffect(() => {
        console.log(getURLSuggestion(search))
    }, [search])

    return (<Container className="full-height">
        <div className="d-flex justify-content-center">
            <p className="display-3">
                <FormattedMessage id="what_are_you_searching_for" />
            </p>
        </div>
        <Input onChange={(e) => setSearch(e.target.value)} />
        <p>{search}</p>
    </Container>)
}

export default HomeScreen