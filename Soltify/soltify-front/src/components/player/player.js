const  Player = ()=> {

    const music = "/Users/kabdrakhman/dev/React-2023/Soltify/soltify-front/src/assets/music/Скриптонит - Животные.mp3"
    return (
        <div>
            <audio ref={{music}}></audio>
        </div>
    )
}

export default Player;