import { useState } from "react"
import { IGithubProfile } from "../@Types/context/contexts"
import { githubApi } from "../services/axios"

export const useBotFunctionsContextProvider = () => {
    const [ infoTextHolo, setInfoTextHolo ] = useState<boolean>(false)
    const [ visorPosition, setVisorPosition ] = useState<string>("visor-to-top")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)
    const [ isShowingMenu, setIsShowingMenu ] = useState<boolean>(false)
    const [ eyeState, setEyeState ] = useState<string>("")

    const [ aboutMePage, setAboutMePage ] = useState<boolean>(false)
    const [ aboutMeState, setAboutMeState ] = useState<string>("")

    const [ homePage, setHomePage ] = useState<boolean>(false)

    const [ githubProfile, setGithubProfile ] = useState<IGithubProfile>()

    const handleGetGithubProfile = async() => {
        try {
            const response = await githubApi.get("/PatrickOtero")

            const gitProfile = {
                avatar_url: response.data.avatar_url,
                url: response.data.html_url,
                name: response.data.name,
                bio: response.data.bio,
            }

            setGithubProfile(gitProfile)

        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    return {
        infoTextHolo,
        setInfoTextHolo,
        visorPosition,
        setVisorPosition,
        botPosition,
        setBotPosition,
        hologramActivated,
        setHologramActivated,
        isShowingMenu,
        setIsShowingMenu,
        eyeState,
        setEyeState,

        aboutMePage,
        setAboutMePage,

        homePage,
        setHomePage,

        handleGetGithubProfile,
        githubProfile,
        setGithubProfile
    }
}