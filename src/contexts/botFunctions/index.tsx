import { createContext } from 'react'
import { IBotContext, ICompProps } from '../../@Types/context/contexts'
import { useBotFunctionsContextProvider } from '../../hooks/useBotFunctionsProvider'

const botContext = createContext({} as IBotContext)

export function BotContextProvider({ children }: ICompProps) {
  const BotContextProvider = useBotFunctionsContextProvider()
  return (
    <botContext.Provider value={BotContextProvider}>
      {children}
    </botContext.Provider>
  )
}

export default botContext