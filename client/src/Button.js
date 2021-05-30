import React from 'react'

const Button = ({color,value,onclick}) => {
    return (
        <div>
            <button style={{backgroundColor : color,color:"white"}} className="btn" onClick={onclick}>{value}</button>
        </div>
    )
}

export default Button
