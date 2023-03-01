import React from 'react'
import style from "./PageNotFound.module.css"

const PageNotFound = () => {
    return (
        <div id={style.wrapper}>
            <div id={style.parent}>
            <img src="https://i.imgur.com/A040Lxr.png" />
            <h2>This Page is Lost in Space</h2>
            <div id="info">
                <p>You thought this mission to the moon would be a quick six month thing. Your neighbor offered to look after your dog. Your high school math teacher was impressed. He once said you wouldn’t amount to anything.You sure showed him. But now here you are, fifty feet from your spaceship with no way to get back. Your dog will be so sad. Your math teacher will be so smug. Pretty devastating.</p>
            </div>
            </div>
        </div >
    )
}

export default PageNotFound