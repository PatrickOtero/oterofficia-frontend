type Props = {
    visorPosition: string;
    eyeState: string;
    hologramActivated: boolean;
};

export const BotHead = ({ visorPosition, eyeState, hologramActivated }: Props) => {
    return (
        <div className="bot-head bot-head--front">
            <div className="bot-head-shell" />

            <div className={`greetBot01-visor ${visorPosition}`}>
                <div className="gb-visor-horizontal">
                    <div
                        className={`gb-eyes eyeLeft ${eyeState} ${
                            hologramActivated ? "beam-active" : ""
                        }`}
                    />
                    <div
                        className={`gb-eyes eyeRight ${eyeState} ${
                            hologramActivated ? "beam-active" : ""
                        }`}
                    />
                </div>

                <div className="gb-visor-vertical">
                    <div className="gb-mouth" />
                </div>
            </div>
        </div>
    );
};