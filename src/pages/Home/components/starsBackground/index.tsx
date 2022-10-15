import { SpaceContainer } from "./stars.style";

export const StarsBackground = () => {
    const stars = new Array(50).fill(".")
    // const shootingStars = new Array(10).fill(".")

    return (
        <SpaceContainer>
            {stars.map((star: any) => 
            {
                return <p style={{ top: Math.random() * 1000, right: Math.random() * 2050, animationDelay: `${Math.random()*10}s` }} className="star-left">{star}</p>
            }
            )}

            {/* {shootingStars.map(shootingStar =>
            {
                return <p style={{top: 10, right: Math.random() * 2000, animationDelay: `${Math.random()*700}s` }} className="shooting-star">{shootingStar}</p>
            }
            )} */}
    </SpaceContainer>
    );
}