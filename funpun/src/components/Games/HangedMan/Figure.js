import React from 'react'

const Figure = props => {
    const { wrongLetters } = props
    const numOfErrors = wrongLetters.length
    return (
        <>
            <svg style={{ width: '100%', height: '100%' }}>
                <line x1="10%" y1="100%" x2="50%" y2="100%" stroke="gray" strokeWidth="15" />{/* base */}
                <line x1="30%" y1="10%" x2="30%" y2="100%" stroke="gray" strokeWidth="5" />{/* pole */}
                <line x1="29.7%" y1="10%" x2="73.5%" y2="10%" stroke="gray" strokeWidth="5" />{/* ledge */}
                <line x1="73.3%" y1="10%" x2="73.3%" y2="22.5%" stroke="gray" strokeWidth="5" />{/* hanger */}

                {numOfErrors > 0 && (
                    <>
                        <circle cx="73.3%" cy="30.5%" r="8.3%" stroke="white" strokeWidth="5" fill="transparent" />
                        {/* <circle cx="69.3%" cy="29%" r="0.3%" stroke="white" strokeWidth="5" fill="transparent" />
                        <circle cx="76.3%" cy="29%" r="0.3%" stroke="white" strokeWidth="5" fill="transparent" />
                        <path d="M50 100 A30 70 0 0 1 10 100" stroke="white" strokeWidth="5" fill="transparent" />*/}
                    </>
                )}

                {numOfErrors > 1 && (
                    <line x1="73.3%" y1="38.5%" x2="73.3%" y2="56.7%" stroke="white" strokeWidth="5" />/* body */
                )}
                {numOfErrors > 2 && (
                    <line x1="73.3%" y1="48.3%" x2="81.7%" y2="40%" stroke="white" strokeWidth="5" />/* right arm */
                )}
                {numOfErrors > 3 && (
                    <line x1="73.3%" y1="48.3%" x2="65%" y2="40%" stroke="white" strokeWidth="5" />/* left arm */
                )}
                {numOfErrors > 4 && (
                    <line x1="73.3%" y1="56.7%" x2="81.7%" y2="73.3%" stroke="white" strokeWidth="5" />/* right foot */
                )}
                {numOfErrors > 5 && (
                    <line x1="73.3%" y1="56.7%" x2="65%" y2="73.3%" stroke="white" strokeWidth="5" />/* left foot */
                )}
            </svg>

        </>
    )
}

export default Figure