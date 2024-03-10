import React from 'react'

const Score = ({score}) => {
  return (
    <>
        

<div className="relative overflow-x-auto mt-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Score
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                    {score}
                </th>
            </tr>
        </thead>
    </table>
</div>

    </>
  )
}

export default Score