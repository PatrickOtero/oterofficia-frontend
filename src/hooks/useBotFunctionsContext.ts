import { useContext } from 'react'
import botContext from '../contexts/botFunctions'

export const useBotFunctionsContext = () => {
  return useContext(botContext)
}