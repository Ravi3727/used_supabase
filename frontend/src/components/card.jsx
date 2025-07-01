import React from 'react'

const Card = ({ data }) => {
    return (
        <>
            <div>
                <div className="bg-gray-500 shadow-lg rounded-lg p-4 mb-4 md:min-w-44 md:min-h-44 w-48 h-44 flex flex-col justify-evenly ">
                    <div className='flex flex-col justify-evenly gap-4 items-center mt-2'>
                        <h2 className="text-sm leading-5 font-semibold text-gray-800 dark:text-white">{data.text}</h2>
                        <p className="text-gray-600 dark:text-gray-400"><span className='text-3xl leading-5 font-semibold text-black dark:text-white'>{data.number}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card