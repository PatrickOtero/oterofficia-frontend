import { SpaceContainer } from "./stars.style";

export const StarsBackground = () => {
    const stars = new Array(30).fill(".")

    return (
        <SpaceContainer>
            {stars.map((star: any, index: number) => 
            {
                return <p key={index * Math.random()} style={{ top: Math.random() * 1000, right: Math.random() * 2050, animationDelay: `${Math.random()*10}s` }} className="star-left">{star}</p>
            }
            )}
        </SpaceContainer>
    );
}