import { LettersContainer } from "./GreetingLetters.style";

export const GreetingLetters = () => {
    const phrase = "Obrigado pela visita!"
    const letters = phrase.split("");

    return (
        <>
            <LettersContainer>
                {letters.map((letter: string, index: number) => {
                    return(
                        <div style={{animationDelay:`${index * 0.5}s`}} className="floating-letter-container">
                            <div style={{animationDelay:`${index * 2}s`}} className="rotating-letter-container">
                                <b className="floating-letter">{letter}</b>
                            </div>
                        </div>
                           )
                    })}
            </LettersContainer>
        </>
    );
}